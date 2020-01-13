import { Chat, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Query: {
    chats: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<Chat[]> => {
      const { chatModel } = models;
      const user = await getUser();

      if (!user) throw new AuthenticationError('User is not signed in');

      return chatModel.findAll({
        where: {
          chatroomId: 1,
        },
      });
    },
  },
};

export default resolver;
