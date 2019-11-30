import * as path from 'path';

import { ApolloServer, PubSub } from 'apollo-server-express';
import { JWT_SECRET, verifyUser } from './models/Auth';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

import { Http2Server } from 'http2';
import { createApp } from './app';
import { createServer as createHttpServer } from 'http';
import { getUserById } from './models/User';
import { importSchema } from 'graphql-import';
import models from './models';

const { PORT = 4000 } = process.env;

const getToken = (req) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};

const createApolloServer = () => new ApolloServer({
  typeDefs: importSchema('schemas/schema.graphql'),
  context: ({ req }) => ({
    getUser: () => {
      const { User } = models;
      const token = getToken(req);

      if (!token) {
        return null;
      }

      const user = verifyUser(token);
      const { userId } = user;

      return getUserById(User, userId);
    },
    isSignedInUser: () => {
      const { User } = models;
      const token = getToken(req);

      if (!token) {
        return false;
      }

      const user = verifyUser(token);
      const { userId } = user;

      if (getUserById(User, userId)) {
        return true;
      }

      return false;
    },
    models,
    pubsub: new PubSub(),
    appSecret: JWT_SECRET,
  }),
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
  resolvers: mergeResolvers(
    fileLoader(path.join(__dirname, './resolvers')),
  ),
  subscriptions: {
    onConnect: () => {
      // console.log('Connected to websocket')
      process.stdout.write('Connected to websocket\n');
    },
  },
});

const initializeApolloServer = (apollo, app) => {
  apollo.applyMiddleware({ app });

  return () => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

const startServer = async (): Promise<Http2Server> => {
  const app = createApp();
  const httpServer = createHttpServer(app);

  const apollo = createApolloServer();
  apollo.installSubscriptionHandlers(httpServer);
  const handleApolloServerInitilized = initializeApolloServer(apollo, app);

  return httpServer.listen({ port: PORT }, () => {
    handleApolloServerInitilized();
  });
};

startServer();
