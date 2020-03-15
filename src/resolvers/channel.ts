import { Channel, Membership, Message, Resolvers } from '../generated/graphql';

import { MemberType } from '../models/Membership';
import { Op } from 'sequelize';
import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Query: {
    channels: async (_, args, { verifyUser, models }): Promise<Channel[]> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Channel: channelModel, Membership: membershipModel } = models;

      const memberships = await membershipModel.findAll({
        where: { userId: auth.userId },
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
    createChannel: async (_, args, { verifyUser, models }): Promise<Channel> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Membership: membershipModel, Channel: channelModel } = models;
      const { name, type, friendIds } = args.channel;

      const channelMembers = [auth.userId, ...friendIds];

      if (channelMembers.length === 2) {
        const channel = await channelModel.findOne({
          include: [
            {
              model: membershipModel,
              as: 'memberships',
              where: {
                userId: channelMembers,
              },
            },
          ],
        });

        if (channel) return channel;
      }

      const channel = await channelModel.create({
        name,
        type,
      });

      const membershipData = channelMembers.map((userId) => {
        return {
          userId,
          channelId: channel.id,
          type: userId === auth.userId || channelMembers.length === 2
            ? MemberType.Owner
            : MemberType.Member,
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
    myMembership: (_, args, { verifyUser, models }): Promise<Membership> => {
      const { userId } = verifyUser();
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
