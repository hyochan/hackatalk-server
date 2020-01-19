import { Notification, Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    addNotificationToken: async (_, { notification }, { models }): Promise<Notification> => {
      const { Notification: notificationModel } = models;

      try {
        const created = await notificationModel.create(notification);
        return created;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
