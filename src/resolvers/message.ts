import { Channel, Message, MessagePayload, Resolvers } from '../generated/graphql';
import { ChannelType } from '../models/Channel';
import { ErrorString } from '../../src/utils/error';
import { MessageType } from '../models/Message';
import { QueryTypes } from 'sequelize';
import { checkAuth } from '../utils/auth';
import sequelize from '../db';

const resolver: Resolvers = {
  Mutation: {
    createMessage: async (_, args, { verifyUser, models }): Promise<MessagePayload> => {
      const { users, message, channelId } = args;
      const {
        Message: messageModel,
        Channel: channelModel,
        Membership: membershipModel,
      } = models;

      if (!args.message) throw ErrorString.MesssageIsEmpty;
      if (!args.users || args.users.length === 0) throw ErrorString.UsersAreEmpty;

      const auth = verifyUser();
      checkAuth(auth);

      try {
        const addMessage = (channelId: string): Promise<Message> => {
          return messageModel.create({
            type: MessageType.Text,
            text: message,
            channelId,
            userId: auth.userId,
          });
        };

        if (channelId) {
          return {
            channelId,
            message: await addMessage(channelId),
          };
        }

        const authUsers = [...new Set([...users, auth.userId])];
        const channels: Array<Channel> = await sequelize.query(`
            SELECT DISTINCT c.id, COUNT(c.id) FROM channels c
            INNER JOIN memberships m ON c.id = m.channelId
              AND m.deletedAt IS NULL
              AND m.userId IN (:authUsers)
              AND (
                SELECT COUNT(m2.channelId)
                FROM channels c2
                INNER JOIN memberships m2 ON c2.id = m2.channelId
                WHERE c2.id = c.id
                GROUP BY m2.channelId
              ) = :authUserNum
            WHERE c.deletedAt IS NULL
            GROUP BY c.id
            HAVING COUNT(c.id) = :authUserNum
          `,
        {
          replacements: { authUsers: authUsers, authUserNum: authUsers.length },
          type: QueryTypes.SELECT,
        },
        );
        let retrievedChannelId = channels[0] ? channels[0].id : null;

        if (!retrievedChannelId) {
          const channel = await channelModel.create(
            {
              type: ChannelType.Private,
              name: '',
            },
          );

          retrievedChannelId = channel.getDataValue('id');

          const membershipPromises = [];

          authUsers.forEach((user, index) => {
            membershipPromises[index++] = membershipModel.create({
              channelId: retrievedChannelId,
              userId: user,
            });
          });

          await Promise.all(membershipPromises);
        }

        return {
          channelId: retrievedChannelId,
          message: await addMessage(retrievedChannelId),
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
