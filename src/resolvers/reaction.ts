import { Reaction, Resolvers } from '../generated/graphql';

import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {

  Mutation: {
    createReaction: async (_, { messageId, type }, { verifyUser, models }): Promise<Reaction> => {
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

  },

  //   // TODO : 논의 필요! Query 완성 -> Migration 완성 -> Test Code 완성 -> PR 날리기
  //   // Query: {
  //   //   reactions: async (_, { messageId}, { verifyUser, models }): Promise<Reaction[]> => {
  //   //     // const auth = verifyUser();
  //   //     // checkAuth(auth);

  //   //     const { Reaction: reactionModel } = models;
  //   //     return reactionModel.findAll({
  //   //       where: {
  //   //         messageId,
  //   //       },
  //   //     });
  //   //     return reactionModel.findAll();
  //   //   },
  //   // },

  //   Mutation: {
  //     // reactionId
  //     createReaction: async (_, { messageId, type }, { verifyUser, models }): Promise<Reaction> => {
  //       // const auth = verifyUser();
  //       // checkAuth(auth);

  //       // if (!auth) throw new AuthenticationError('User is not signed in');

  //       const { Reaction: reactionModel } = models;
  //       const reaction = await reactionModel.create({
  //         messageId,
  //         // userId: auth.userId,
  //         type,
  //       });

  //       return reaction;
  //     },
  //     deleteReaction: async (_, { reactionId }, { verifyUser, models }): Promise<number> => {
  //       // const auth = verifyUser();
  //       // checkAuth(auth);

  //       // if (!auth) throw new AuthenticationError('User is not signed in');

  //       const { Reaction: reactionModel } = models;

  //       const result = await reactionModel.destroy({
  //         where: {
  //           id: reactionId,
  //         },
  //       });

//       return result;
//     },
//   },
};

export default resolver;
