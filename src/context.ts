import models, { ModelType } from './models';

import { JwtUser } from './types';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'apollo-server';
import { User } from './models/User';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export interface MyContext {
  getUser: () => Promise<User>;
  verifyUser: () => JwtUser;
  models: ModelType;
  pubsub: PubSub;
  appSecret: string;
}

export interface ExpressContext {
  req: Request;
  res: Response;
  connection?: any;
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

      const user = jwt.verify(token, JWT_SECRET) as JwtUser;
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

      return jwt.verify(token, JWT_SECRET) as JwtUser;
    },
    models,
    pubsub,
    appSecret: JWT_SECRET,
  };
}
