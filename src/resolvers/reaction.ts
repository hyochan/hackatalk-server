import { Reaction, Resolvers } from '../generated/graphql';

import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Mutation: {
    createReaction: async (
      _,
      { messageId, type },
      { verifyUser, models },
    ): Promise<Reaction> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Reaction: reactionModel } = models;

      const reaction = await reactionModel.create({
        messageId,
        userId: auth.userId,
        type,
      });

      return reaction;
    },
    deleteReaction: async (
      _,
      { reactionId },
      { verifyUser, models },
    ): Promise<number> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Reaction: reactionModel } = models;

      const result = await reactionModel.destroy({
        where: {
          id: reactionId,
        },
      });

      return result;
    },
  },
};

export default resolver;
