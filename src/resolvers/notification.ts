import { Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    addPushToken: async (_, args, { models }) => {
      try {
        const notification = await models.Notification.create(
          args.notification,
          { raw: true },
        );
        return notification;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
