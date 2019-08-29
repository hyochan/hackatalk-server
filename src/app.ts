import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import { ApolloServer, PubSub } from 'apollo-server-express';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import { Http2Server } from 'http2';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { importSchema } from 'graphql-import';
import models from './models';

require('dotenv').config();

const { PORT = 4000, JWT_SECRET = 'undefined' } = process.env;

const pubsub = new PubSub();
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const getUser = async (token: string, models) => {
  const userId = jwt.verify(token, JWT_SECRET);
  const currentUser = await models.User.findOne({
    where: {
      id: userId,
    },
  });
  return currentUser;
};

const typeDefs = importSchema('schemas/schema.graphql');

async function startServer(): Promise<Http2Server> {
  const apollo = new ApolloServer({
    typeDefs,
    context: ({ req }) => ({
      getUser: async () => {
        const authHeader = req.get('Authorization');
        let user = null;
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '');
          user = await getUser(token, models);
        }
        return user;
      },
      models,
      pubsub,
      appSecret: JWT_SECRET,
    }),
    resolvers,
    subscriptions: {
      onConnect: () => {
        // console.log('Connected to websocket')
        process.stdout.write('Connected to websocket\n');
      },
    },
  });

  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('It works!!!!');
  });
  apollo.applyMiddleware({ app });

  const options = {
    key: fs.readFileSync('key/key.pem'),
    cert: fs.readFileSync('key/cert.pem'),
  };

  const httpServer =
    process.env.NODE_ENV === 'production'
      ? createHttpsServer(options, app)
      : createHttpServer(app);
  apollo.installSubscriptionHandlers(httpServer);

  const server = httpServer.listen({ port: PORT }, () => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`,
    );
  });

  return server;
}

export { startServer };
