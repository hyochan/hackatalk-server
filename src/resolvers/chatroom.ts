import { AuthenticationError } from 'apollo-server';
import { Resolvers } from '../generated/graphql';
import { getChatroomsByOwnerId } from '../models/Chatroom';

const resolver: Resolvers = {
  Query: {
    chatrooms: async (
      _,
      args, {
        isSignedInUser,
        models,
      },
    ) => {
      const { Chatroom } = models;
      const signedIn = await isSignedInUser();

      if (!signedIn) throw new AuthenticationError('User is not signed in');

      return getChatroomsByOwnerId(Chatroom, 1);
    },
  },
};

export default resolver;
