import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../generated/graphql';

const USER_ADDED = 'USER_ADDED';

const UserResolver: Resolvers = {
  Query: {
    users: (_, args, { models }) => models.User.findAll(),
    user: (_, args, { models }) => models.User.findOne({ where: args }),
  },
  Mutation: {
    signup: async (_, args, { appSecret, models, pubsub }) => {
      const user = await models.User.create(args, { raw: true });
      const token: string = jwt.sign({ userId: user.id }, appSecret);
      console.log('user', JSON.stringify(user));
      pubsub.publish(USER_ADDED, {
        userAdded: user,
      });
      return { token, user };
    },
  },
  Subscription: {
    userAdded: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator([USER_ADDED]),
    },
  },
};

export default UserResolver;
