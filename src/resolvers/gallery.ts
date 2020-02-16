import { Gallery, Resolvers } from '../generated/graphql';

import { ErrorUrlNotValid } from '../utils/error';
import { checkAuth } from '../utils/auth';

const throwInvalidURL = (photoURL: string): void => {
  if (!photoURL.startsWith('http')) {
    throw ErrorUrlNotValid();
  }
};

const resolver: Resolvers = {
  Query: {
    galleries: async (_, { userId }, { verifyUser, models }): Promise<Gallery[]> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Gallery: galleryModel } = models;

      return galleryModel.findAll({
        where: {
          userId,
        },
      });
    },
  },
  Mutation: {
    createGallery: async (_, { photoURL }, { verifyUser, models }): Promise<Gallery> => {
      const auth = verifyUser();
      checkAuth(auth);

      throwInvalidURL(photoURL);

      const { Gallery: galleryModel } = models;
      const gallery = await galleryModel.create({
        photoURL,
        userId: auth.userId,
      });

      return gallery;
    },
    updateGallery: async (_, { galleryId, photoURL }, { verifyUser, models }): Promise<number> => {
      const auth = verifyUser();
      checkAuth(auth);

      throwInvalidURL(photoURL);

      const { Gallery: galleryModel } = models;

      const result = await galleryModel.update(
        { photoURL },
        {
          where: {
            id: galleryId,
          },
        },
      );

      return result[0];
    },
    deleteGallery: async (_, { galleryId }, { verifyUser, models }): Promise<number> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Gallery: galleryModel } = models;
      const result = await galleryModel.destroy({
        where: {
          id: galleryId,
        },
      });

      return result;
    },
  },
};

export default resolver;
