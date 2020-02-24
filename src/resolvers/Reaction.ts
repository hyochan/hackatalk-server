import { Reaction, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Query: {
    reactions: async (_, arg, { verifyUser, models }): Promise<Reaction[]> => {
      const auth = verifyUser();

      if (!auth) throw new AuthenticationError('User is not signed in');
      const { Reaction: reactionModel } = models;
      return reactionModel.findAll();
    },
  },

  Mutation: {
    createReaction: async (_, { type }, { verifyUser, models }): Promise<Reaction> => {
      const auth = verifyUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { Reaction: reactionModel } = models;

      const reaction = await reactionModel.create({
        type,
        userId: auth.userId,
      });

      return reaction;
    },
    deleteReaction: async (_, { reactionId }, { verifyUser, models }): Promise<number> => {
      const auth = verifyUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { Reaction: reactionModel } = models;
      const result = await reactionModel.destroy({
        where: {
          id: reactionId,
        },
      });

      return result[0];
    },
  },
};

export default resolver;
