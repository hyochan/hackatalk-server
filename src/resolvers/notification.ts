import { Notification, Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    addPushToken: async (
      _, {
        notification,
      }, {
        models,
      },
    ): Promise<Notification> => {
      const { Notification: notificationModel } = models;

      try {
        return notificationModel.create(
          notification,
          { raw: true },
        );
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
