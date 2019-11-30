import { Resolvers } from '../generated/graphql';
import { getChatsByChatroomId } from '../models/Chat';

const resolver: Resolvers = {
  Query: {
    chats: async (
      _,
      args, {
        models,
      },
    ) => {
      const { Chat } = models;

      return getChatsByChatroomId(Chat, 1);
    },
  },
};

export default resolver;
