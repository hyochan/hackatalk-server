import { Resolvers, User } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';
import { Op } from 'sequelize';
import { withFilter } from 'apollo-server';

const FRIENDS_CHANGED = 'FRIENDS_CHANGED';

const resolver: Resolvers = {
  Query: {
    friends: async (_, args, { getUser, models }): Promise<User[]> => {
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      const { Friend: friendModel, User: userModel } = models;

      const friendIds = await friendModel.findAll({
        attributes: ['userId'],
        where: { userId: { [Op.eq]: auth.id } },
        raw: true,
      });

      const friendArray = [];
      friendIds.forEach((friendId) => {
        friendArray.push(friendId.userId);
      });

      const friends = await userModel.findAll({
        where: { id: { [Op.in]: friendArray } },
        raw: true,
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
