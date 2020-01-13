import { JWT_SECRET, verifyUser } from './models/Auth';
import models, { ModelType } from './models';

import { ApolloServer } from 'apollo-server-express';
import { Http2Server } from 'http2';
import { PubSub } from 'graphql-subscriptions';
import { User } from './models/User';
import { allResolvers } from './resolvers';
import { createApp } from './app';
import { createServer as createHttpServer } from 'http';
import express from 'express';
import { importSchema } from 'graphql-import';

const { PORT = 4000 } = process.env;
const pubsub = new PubSub();

// eslint-disable-next-line
const getToken = (req: Express.Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};

const createApolloServer = (): ApolloServer => new ApolloServer({
  typeDefs: importSchema('schemas/schema.graphql'),
  context: ({ req }): {
    getUser: () => Promise<User>;
    models: ModelType;
    pubsub: PubSub;
    appSecret: string;
  } => ({
    getUser: (): Promise<User> => {
      const { User: userModel } = models;
      const token = getToken(req);

      if (!token) {
        return null;
      }

      const user = verifyUser(token);
      const { userId } = user;

      return userModel.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
    },
    // @ts-ignore
    models,
    pubsub,
    appSecret: JWT_SECRET,
  }),
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
  resolvers: allResolvers,
  subscriptions: {
    onConnect: (): void => {
      process.stdout.write('Connected to websocket\n');
    },
  },
});

const initializeApolloServer = (apollo: ApolloServer, app: express.Application): () => void => {
  apollo.applyMiddleware({ app });

  return (): void => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

export const startServer = async (app: express.Application): Promise<Http2Server> => {
  const httpServer = createHttpServer(app);

  const apollo = createApolloServer();
  apollo.installSubscriptionHandlers(httpServer);
  const handleApolloServerInitilized = initializeApolloServer(apollo, app);

  return httpServer.listen({ port: PORT }, () => {
    handleApolloServerInitilized();
  });
};

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  startServer(app);
}
