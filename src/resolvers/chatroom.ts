import { Resolvers } from '../generated/graphql';
import { getChatroomsByOwnerId } from '../models/Chatroom';

const resolver: Resolvers = {
  Query: {
    chatrooms: async (
      _,
      args, {
        models,
      },
    ) => {
      const { Chatroom } = models;

      return getChatroomsByOwnerId(Chatroom, 1);
    },
  },
};

export default resolver;
