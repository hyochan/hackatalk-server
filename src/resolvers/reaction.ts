import { Reaction, ReactionGroup, Resolvers } from '../generated/graphql';
import { Op } from 'sequelize';
import { checkAuth } from '../utils/auth';

// interface ReactionGroup {
//   type: string;
//   reactions: Reactions[];
// }

// interface Reactions {
//   id: string;
//   userId: string;
// }

const resolver: Resolvers = {
  Query: {
    reactions: async (_, { messageId }, { verifyUser, models }): Promise<ReactionGroup[]> => {
      // const auth = verifyUser();
      // checkAuth(auth);

      const { Reaction: reactionModel } = models;

      // 방법 1
      // 1. createdAt 오름차순으로 reaction을 가져온다.
      const reactions = await reactionModel.findAll({
        attributes: ['id', 'type', 'userId', 'createdAt'],
        where: {
          messageId: messageId,
        },
        order: [['createdAt', 'ASC']],
        raw: true,
      });
      console.log('reactions ', reactions);

      // 2. 기존 순서 그대로 두고, 중복되는 type만 제거
      const types = [];
      reactions.map((item) => types.push(item.type));
      console.log('types with overlap ', types);

      const typesWithoutOverlap = types.reduce(function(a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);

      console.log('types without overlap : ', typesWithoutOverlap);

      // // 방법 2 : group by
      // // 1. createdAt 오름차순으로 reaction을 가져온다.
      // const reactions = await reactionModel.findAll({
      //   attributes: ['id', 'type', 'userId', 'createdAt'],
      //   where: {
      //     messageId: messageId,
      //   },
      //   group: ['type'],
      //   order: [['createdAt', 'ASC']],
      //   raw: true,
      // });
      // console.log('reactions ', reactions);

      // // 2. createdAt 순서로 정렬
      // reactions.sort(function(a, b) { // 오름차순
      //   return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
      // });

      // console.log('reactionsSortedByType ', reactions);

      // 3. type별로 reaction grouping
      const reactionGroups: ReactionGroup[] = [];
      typesWithoutOverlap.forEach((type) => {
        const reactionsGroupByType = reactions.filter((item) => item.type === type);
        reactionGroups.push({
          type: type,
          reactions: reactionsGroupByType,
        });
      });

      console.log('reactionGroups : ', reactionGroups);

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
