import { ApolloServer, gql } from 'apollo-server-express';
import { JWT_SECRET, JwtUser, getToken, verifyUser } from './utils/auth';
import { Http2Server } from 'http2';
import { MyContext } from './context';
import { PubSub } from 'graphql-subscriptions';
import SendGridMail from '@sendgrid/mail';
import { User } from './models/User';
import { allResolvers } from './resolvers';
import { createApp } from './app';
import { createServer as createHttpServer } from 'http';
import express from 'express';
import { importSchema } from 'graphql-import';
import models from './models';

SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const { PORT = 4000 } = process.env;
const pubsub = new PubSub();

const typeDefs = importSchema('schemas/schema.graphql').replace(
  'scalar Upload',
  '',
);

const createApolloServer = (): ApolloServer =>
  new ApolloServer({
    typeDefs,
    context: ({ req }): MyContext => ({
      verifyUser: (): JwtUser => {
        const token = getToken(req);
        if (!token) {
          return null;
        }
        return verifyUser(token);
      },
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
      models,
      pubsub,
      appSecret: JWT_SECRET,
    }),
    introspection: !!(process.env.NODE_ENV !== 'production'),
    playground: !!(process.env.NODE_ENV !== 'production'),
    resolvers: allResolvers,
    subscriptions: {
      onConnect: (): void => {
        process.stdout.write('Connected to websocket\n');
      },
    },
  });

const initializeApolloServer = (
  apollo: ApolloServer,
  app: express.Application,
): (() => void) => {
  apollo.applyMiddleware({
    app,
    bodyParserConfig: {
      limit: '100mb',
    },
  });

  return (): void => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

export const startServer = async (
  app: express.Application,
): Promise<Http2Server> => {
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
