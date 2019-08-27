import { Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    createMessage: async (_, args, { model, user }) => {
      try {
        await model.Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

export default resolver;
