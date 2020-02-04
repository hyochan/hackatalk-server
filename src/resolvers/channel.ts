import { Channel, Membership, Message, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';
import { MemberType } from '../models/Membership';
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
      const { name, type, friendIds } = args.channel;

      if (!friendIds || friendIds.length === 0) throw new Error('friendIds is required');

      const channelMembers = [auth.id, ...friendIds];
      const channel = await channelModel.create({
        name,
        type,
      });

      const membershipData = channelMembers.map((userId) => {
        return {
          userId,
          channelId: channel.id,
          ...((userId === auth.id || channelMembers.length === 2) && {
            type: MemberType.Owner,
          }),
        };
      });
      await membershipModel.bulkCreate(membershipData);

      return channel;
    },
  },
  Channel: {
    memberships: (_, args, { models }): Promise<Membership[]> => {
      const { id } = _;
      const { Membership: membershipModel } = models;

      return membershipModel.findAll({
        where: {
          channelId: id,
        },
      });
    },
    myMembership: async (_, args, { getUser, models }): Promise<Membership> => {
      const { id: userId } = await getUser();
      const { id: channelId } = _;
      const { Membership: membershipModel } = models;

      return membershipModel.findOne({
        where: {
          channelId,
          userId,
        },
      });
    },
    messages: (_, args, { models }): Promise<Message[]> => {
      const { id } = _;
      const { Message: messageModel } = models;

      return messageModel.findAll({
        where: {
          channelId: id,
        },
      });
    },
  },
};

export default resolver;
