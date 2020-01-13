import { Friend, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server';

const resolver: Resolvers = {
  Query: {
    friends: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<Friend[]> => {
      const { Friend: friendModel } = models;
      const { userId } = await getUser();

      if (!userId) throw new AuthenticationError('User is not signed in');

      return friendModel.findAll({
        where: {
          id: userId,
        },
      });
    },
  },
};

export default resolver;
