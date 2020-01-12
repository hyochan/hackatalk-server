import { AuthenticationError } from 'apollo-server';
import { Resolvers } from '../generated/graphql';
import { getChatsByChatroomId } from '../models/Chat';

const resolver: Resolvers = {
  Query: {
    chats: async (
      _,
      args, {
        isSignedInUser,
        models,
      },
    ) => {
      const { Chat } = models;
      const signedIn = await isSignedInUser();

      if (!signedIn) throw new AuthenticationError('User is not signed in');

      return getChatsByChatroomId(Chat, 1);
    },
  },
};

export default resolver;
