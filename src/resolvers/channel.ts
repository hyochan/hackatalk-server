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

      const channels = await channelModel.findAll({
        where: {
          ownerId: user.id,
        },
        include: [
          {
            model: models.User,
            as: 'owner',
          },
        ],
      });

      return channels;
    },
  },
};

export default resolver;
