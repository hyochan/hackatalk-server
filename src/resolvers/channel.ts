import { Channel, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';
import { ChannelType } from '../models/Channel';
import { Op } from 'sequelize';

const resolver: Resolvers = {
  Query: {
    channels: async (_, args, { getUser, models }): Promise<Channel[]> => {
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { Channel: channelModel, Membership: membershipModel } = models;

      const memberships = await membershipModel.findAll({
        where: { userId: auth.id },
        raw: true,
      });

      const channelIds = [];
      memberships.forEach((membership) => {
        channelIds.push(membership.channelId);
      });

      const channels = await channelModel.findAll({
        where: { id: { [Op.in]: channelIds } },
        raw: true,
      });

      return channels;
    },
  },
  Mutation: {
    createChannel: async (_, args, { getUser, models }): Promise<Channel> => {
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { Membership: membershipModel, Channel: channelModel } = models;
      const { name, type, friendsId } = args.channel;

      /**
       * TODO
       * 1. Check if there is a membership with only two users with `PRIVATE` type.
       * 2. Create new channel
       */
      const channel = await channelModel.create({
        name,
        type,
      });

      return channel;
    },
  },
};

export default resolver;
