import { JwtUser, verifyUser as verifyAuth } from './utils/auth';
import models, { ModelType } from './models';

import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'apollo-server';
import { User } from './models/User';

const { JWT_SECRET } = process.env;

export interface MyContext {
  getUser: () => Promise<User>;
  verifyUser: () => JwtUser;
  models: ModelType;
  pubsub: PubSub;
  appSecret: string;
}

const pubsub = new PubSub();

// eslint-disable-next-line
export const getToken = (req: Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};

export function createContext(ctx: ExpressContext): MyContext {
  const request = ctx.req;

  return {
    getUser: (): Promise<User> => {
      const { User: userModel } = models;
      const token = getToken(request);

      if (!token) {
        return null;
      }

      const user = verifyAuth(token);
      const { userId } = user;

      return userModel.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
    },
    verifyUser: (): JwtUser => {
      const token = getToken(request);
      if (!token) {
        return null;
      }
      return verifyAuth(token);
    },
    models,
    pubsub,
    appSecret: JWT_SECRET,
  };
}
