import { Message, Resolvers } from '../generated/graphql';

import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Query: {
    messages: async (
      _,
      args, {
        verifyUser,
        models,
      },
    ): Promise<Message[]> => {
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
};

export default resolver;
