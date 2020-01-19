import { Friend, Resolvers, User } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';
import { withFilter } from 'apollo-server';

const FRIENDS_CHANGED = 'FRIENDS_CHANGED';

const resolver: Resolvers = {
  Query: {
    friends: async (_, args, { getUser, models }): Promise<Friend[]> => {
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { Friend: friendModel, User: userModel } = models;

      const friends = await friendModel.findAll({
        where: { userId: { $eq: auth.id } },
        include: [
          {
            model: userModel,
            as: 'user',
          },
        ],
      });

      return friends;
    },
  },
  Mutation: {
    addFriend: async (_, { friendId }, { getUser, models, pubsub }):
      Promise<User> => {
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { User: userModel, Friend: friendModel } = models;

      try {
        const user = await userModel.findOne({
          where: { id: friendId },
        });

        await friendModel.upsert(
          {
            userId: auth.id,
            friendId,
            deletedAt: null,
          },
        );

        pubsub.publish(FRIENDS_CHANGED, {
          friendsChanged: auth,
        });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteFriend: async (_, { friendId }, { getUser, models, pubsub }):
      Promise<User> => {
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { User: userModel, Friend: friendModel } = models;

      try {
        const user = await userModel.findOne({
          where: { id: friendId },
          raw: true,
        });

        await friendModel.destroy(
          {
            where: {
              userId: auth.id,
              friendId,
            },
          },
        );

        pubsub.publish(FRIENDS_CHANGED, {
          friendsChanged: auth,
        });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    friendsChanged: {
      subscribe: withFilter(
        (_, args, { pubsub }) => pubsub.asyncIterator(FRIENDS_CHANGED),
        (payload, { userId }) => {
          const { friendsChanged } = payload;
          return friendsChanged.id === userId;
        },
      ),
    },
  },
};

export default resolver;
