import { Message, MessagePayload, Resolvers } from '../generated/graphql';

import { ChannelType } from '../models/Channel';
import { ErrorString } from '../../src/utils/error';
import { MessageType } from '../models/Message';
import { checkAuth } from '../utils/auth';

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

        const authUsers = [...users, auth.userId];
        const channel = await channelModel.findOne({
          include: [
            {
              model: membershipModel,
              as: 'memberships',
              where: {
                userId: authUsers,
              },
              attributes: [
                'channelId', 'userId',
              ],
            },
          ],
        });

        let retrievedChannelId = channel?.getDataValue('id') || undefined;

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
