import { Resolvers } from '../generated/graphql';
import { getFriendsByUserId } from '../models/Friend';

const resolver: Resolvers = {
  Query: {
    friends: async (
      _,
      args, {
        models,
      },
    ) => {
      const { Friend } = models;

      return getFriendsByUserId(Friend, 1);
    },
  },
};

export default resolver;
