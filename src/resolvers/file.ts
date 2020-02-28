import { File, Resolvers } from '../generated/graphql';

import { uploadFileToAzureBlobFromFile } from '../utils/azure';

const resolver: Resolvers = {
  Mutation: {
    singleUpload: async (_, args): Promise<string> => {
      const dir: string = args.dir ? args.dir : 'defaults';
      const file = await args.file;
      const resultUpload = await uploadFileToAzureBlobFromFile(
        `./files/${file.filename}`,
        file.filename,
        dir,
      );

      const { STORAGE_ENDPOINT } = process.env;

      return `${STORAGE_ENDPOINT}/${dir}/${file.filename}`;
    },
  },
};

export default resolver;
