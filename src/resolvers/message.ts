import { Message, MessagePayload, Resolvers } from '../generated/graphql';

import { ChannelType } from '../models/Channel';
import { MessageType } from '../models/Message';
import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Query: {
    messages: async (_, args, { verifyUser, models }): Promise<Message[]> => {
      const { Message: messageModel } = models;
      const auth = verifyUser();
      checkAuth(auth);

      return messageModel.findAll({
        where: {
          messageId: 1,
        },
      });
    },
  },
  Mutation: {
    createMessage: async (_, args, { verifyUser, models }): Promise<MessagePayload> => {
      const { users, message, channelId } = args;
      const {
        Message: messageModel,
        Channel: channelModel,
        Membership: membershipModel,
      } = models;
      const auth = verifyUser();

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
      /**
       * TODO: Check data and see if findOne can replace findAll
       */
      const channels = await channelModel.findAll({
        where: {
          membershipuserId: authUsers,
        },
        include: [
          {
            model: membershipModel,
            as: 'membership',
            attributes: [
              'channelId', 'userId',
            ],
          },
        ],
      });

      if (!channels || channels.length === 0) {
        const channel = await channelModel.create({
          type: ChannelType.Private,
          name: '',
        });

        const membershipPromises = [];

        users.forEach((user, index) => {
          membershipPromises[index++] = membershipModel.create({
            channelId: channel.id,
            userId: user,
          });
        });

        await Promise.all(membershipPromises);
        return {
          channelId: channel.id,
          message: await addMessage(channel.id),
        };
      }
    },
  },
};

export default resolver;
