import { Notification, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Mutation: {
    addNotificationToken: async (
      _, { notification }, { models, getUser }): Promise<Notification> => {
      const { Notification: notificationModel } = models;

      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const notificationArgs = {
        ...notification,
        userId: auth.id,
      };

      try {
        const created = await notificationModel.create(notificationArgs);
        return created;
      } catch (err) {
        throw new Error(err);
      }
    },
    removeNotificationToken: async (
      _, { token }, { models, getUser }): Promise<number> => {
      const { Notification: notificationModel } = models;

      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      try {
        const deleted = await notificationModel.destroy({
          where: {
            userId: auth.id,
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
