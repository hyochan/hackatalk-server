import { File, Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    singleUpload: async (_, args): Promise<File> => {
      const file = await args.file;
      return file;
    },
  },
};

export default resolver;
