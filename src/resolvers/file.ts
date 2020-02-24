import { Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    singleUpload: async (_, args) => {
      const file = await args.file;
      return file;
    },
  },
};

export default resolver;
