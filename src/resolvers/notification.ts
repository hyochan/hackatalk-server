import { Resolvers } from '../generated/graphql';

const createNotification = async (Notification, notification) => Notification.create(
  notification,
  { raw: true },
);

const resolver: Resolvers = {
  Mutation: {
    addPushToken: async (
      _, {
        notification,
      }, {
        models,
      },
    ) => {
      const { Notification } = models;

      try {
        return createNotification(Notification, notification);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
