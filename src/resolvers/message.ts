import { Message, MessagePayload, Resolvers } from '../generated/graphql';

import { MessageType } from '../models/Message';
import { Op } from 'sequelize';
import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Mutation: {
    createMessage: async (_, args, { verifyUser, models }): Promise<MessagePayload> => {
      const { message, channelId } = args;
      const {
        Message: messageModel,
        Membership: membershipModel,
      } = models;

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

        /**
         * Used to find users to send push notifications
         */
        const members = await membershipModel.findAll({
          attributes: [
            'userId',
          ],
          where: {
            channelId,
            userId: {
              [Op.ne]: auth.userId,
            },
          },
          raw: true,
        });

        return {
          channelId,
          message: await addMessage(channelId),
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
