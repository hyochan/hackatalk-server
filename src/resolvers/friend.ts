import { Friend, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Query: {
    friends: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<Friend[]> => {
      const user = await getUser();

      if (!user) throw new AuthenticationError('User is not signed in');

      return models.Friend.findAll({
        where: {
          id: user.id,
        },
      });
    },
  },
};

export default resolver;
