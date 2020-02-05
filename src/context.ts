import { JwtUser } from './utils/auth';
import { ModelType } from './models';
import { PubSub } from 'graphql-subscriptions';
import { User } from './models/User';

export interface MyContext {
  verifyUser: () => JwtUser;
  getUser: () => Promise<User>;
  models: ModelType;
  pubsub: PubSub;
  appSecret: string;
}
