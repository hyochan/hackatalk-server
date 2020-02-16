import { FriendSubAction, Resolvers, User } from '../generated/graphql';

import {
  ErrorUserNotSignedIn,
} from '../utils/error';
import { Op } from 'sequelize';
import { checkAuth } from '../utils/auth';
import { withFilter } from 'apollo-server';

const FRIENDS_CHANGED = 'FRIENDS_CHANGED';

const resolver: Resolvers = {
  Query: {
    friends: async (_, args, { verifyUser, models }): Promise<User[]> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { Friend: friendModel, User: userModel } = models;

      const friendIds = await friendModel.findAll({
        attributes: ['friendId'],
        where: { userId: { [Op.eq]: auth.userId } },
        raw: true,
      });

      const friends = await userModel.findAll({
        where: {
          id: { [Op.in]: friendIds.map(({ friendId }) => friendId) },
        },
        raw: true,
      });

      return friends;
    },
  },
  Mutation: {
    addFriend: async (_, { friendId }, { verifyUser, models, pubsub }):
      Promise<User> => {
      const auth = verifyUser();
      checkAuth(auth);

      const { User: userModel, Friend: friendModel } = models;

      try {
        const user = await userModel.findOne({
          where: { id: friendId },
        });

        await friendModel.upsert(
          {
            userId: auth.userId,
            friendId,
            deletedAt: null,
          },
        );

        pubsub.publish(FRIENDS_CHANGED, {
          friendChanged: {
            user,
            action: FriendSubAction.Added,
          },
        });
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    deleteFriend: async (_, { friendId }, { verifyUser, models, pubsub }):
      Promise<User> => {
      const auth = verifyUser();
      checkAuth(auth);

      if (!auth) throw ErrorUserNotSignedIn();

      const { User: userModel, Friend: friendModel } = models;

      try {
        const user = await userModel.findOne({
          where: { id: friendId },
          raw: true,
        });

        await friendModel.destroy(
          {
            where: {
              userId: auth.userId,
              friendId,
            },
          },
        );

        pubsub.publish(FRIENDS_CHANGED, {
          friendChanged: {
            user,
            action: FriendSubAction.Deleted,
          },
        });
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Subscription: {
    friendChanged: {
      subscribe: withFilter(
        (_, args, { pubsub }) => pubsub.asyncIterator(FRIENDS_CHANGED),
        (payload, { userId }) => {
          const { friendChanged } = payload;
          return friendChanged.userId === userId;
        },
      ),
    },
  },
};

export default resolver;
