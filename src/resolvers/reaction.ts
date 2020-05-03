import { Reaction, ReactionGroup, Resolvers } from '../generated/graphql';
import { Op } from 'sequelize';
import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Query: {
    reactions: async (_, { messageId }, { verifyUser, models }): Promise<ReactionGroup[]> => {
      // const auth = verifyUser();
      // checkAuth(auth);

      const { Reaction: reactionModel } = models;

      const reactions = await reactionModel.findAll({
        attributes: ['id', 'type', 'userId', 'createdAt'],
        where: {
          messageId: messageId,
        },
        order: [['createdAt', 'ASC']],
        raw: true,
      });

      const types = [];
      reactions.map((item) => types.push(item.type));

      const typesWithoutOverlap = types.reduce(function(a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);

      const reactionGroups: ReactionGroup[] = [];
      typesWithoutOverlap.forEach((type) => {
        const reactionsGroupByType = reactions.filter((item) => item.type === type);
        reactionGroups.push({
          type: type,
          reactions: reactionsGroupByType,
        });
      });

      return reactionGroups;
    },
  },
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
