import { AuthenticationError } from 'apollo-server';
import { Resolvers } from '../generated/graphql';
import { getFriendsByUserId } from '../models/Friend';

const resolver: Resolvers = {
  Query: {
    friends: async (
      _,
      args, {
        isSignedInUser,
        models,
      },
    ) => {
      const { Friend } = models;
      const signedIn = await isSignedInUser();

      if (!signedIn) throw new AuthenticationError('User is not signed in');

      return getFriendsByUserId(Friend, 1);
    },
  },
};

export default resolver;
