import { Channel, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Query: {
    channels: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<Channel[]> => {
      const { Channel: channelModel } = models;
      const user = await getUser();

      if (!user) throw new AuthenticationError('User is not signed in');

      return channelModel.findAll({
        where: {
          ownerId: channelModel.id,
        },
      });
    },
  },
};

export default resolver;
