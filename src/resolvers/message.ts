import { Message, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Query: {
    messages: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<Message[]> => {
      const { Message: messageModel } = models;
      const user = await getUser();

      if (!user) throw new AuthenticationError('User is not signed in');

      return messageModel.findAll({
        where: {
          messageId: 1,
        },
      });
    },
  },
};

export default resolver;
