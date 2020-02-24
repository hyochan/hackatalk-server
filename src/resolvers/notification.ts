import { Notification, Resolvers } from '../generated/graphql';

import { checkAuth } from '../utils/auth';

const resolver: Resolvers = {
  Mutation: {
    addNotificationToken: async (
      _, { notification }, { models, verifyUser }): Promise<Notification> => {
      const { Notification: notificationModel } = models;

      const auth = verifyUser();
      checkAuth(auth);

      const notificationArgs = {
        ...notification,
        userId: auth.userId,
      };

      try {
        const created = await notificationModel.create(notificationArgs);
        return created;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    removeNotificationToken: async (
      _, { token }, { models, verifyUser }): Promise<number> => {
      const { Notification: notificationModel } = models;

      const auth = verifyUser();
      checkAuth(auth);

      try {
        const deleted = await notificationModel.destroy({
          where: {
            userId: auth.userId,
            token,
          },
        });
        return deleted;
      } catch (err) {
        throw new Error(err.message);
      };
    },
  },
};

export default resolver;
