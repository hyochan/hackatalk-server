import { Resolvers } from '../generated/graphql';

import { uploadFileToAzureBlobFromStream } from '../utils/azure';

const resolver: Resolvers = {
  Mutation: {
    singleUpload: async (_, args): Promise<string> => {
      const dir: string = args.dir ? args.dir : 'defaults';
      const file = await args.file;
      const { filename } = file;
      const stream = file.createReadStream();
      const resultUpload = await uploadFileToAzureBlobFromStream(
        stream,
        filename,
        dir,
      );

      const { STORAGE_ENDPOINT } = process.env;

      return `${STORAGE_ENDPOINT}/${dir}/${filename}`;
    },
  },
};

export default resolver;
