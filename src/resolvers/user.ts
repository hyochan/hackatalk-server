import {
  Token,
  getOrSignUp,
  isSignedIn,
  isSignedInBySocial,
  isValidUser,
  signIn,
} from '../models/Auth';
import { getUsers, udpateUser } from '../models/User';

import { AuthenticationError } from 'apollo-server-express';
import { Resolvers } from '../generated/graphql';
import { encryptPassword } from '../utils/password';
import { getNotificationsByUserId } from '../models/Notification';
import { getReviewsByUserId } from '../models/Review';
import { withFilter } from 'apollo-server';

const USER_ADDED = 'USER_ADDED';
const USER_UPDATED = 'USER_UPDATED';
const SOCIAL_NAME = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

const resolver: Resolvers = {
  Query: {
    users: async (
      _,
      args, {
        isSignedInUser,
        models,
      },
      info,
    ) => {
      const { User } = models;
      const signedIn = await isSignedInUser();

      if (!signedIn) throw new AuthenticationError('User is not signed in');

      return getUsers(User);
    },
    user: (_, args, { models }) => {
      const { User } = models;

      return User.findOne({ where: args });
    },
  },
  Mutation: {
    signInGoogle: async (
      _, {
        socialUser,
      }, {
        appSecret,
        models,
      }) => {
      const { email } = socialUser;
      const { User } = models;

      try {
        if (email) {
          const signedIn = await isSignedInBySocial(User, socialUser, SOCIAL_NAME.GOOGLE);

          if (signedIn) {
            throw new Error('Email for current user is already signed in');
          }
        }

        const user = await getOrSignUp(User, socialUser, SOCIAL_NAME.GOOGLE);

        if (!user) {
          throw new Error('Failed to sign up.');
        }

        const { id: userId } = user;
        const token: Token = signIn(userId, appSecret);

        return {
          token,
          user,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    signInFacebook: async (
      _, {
        socialUser,
      }, {
        appSecret,
        models,
      }) => {
      const { email } = socialUser;
      const { User } = models;

      try {
        if (email) {
          const signedIn = await isSignedInBySocial(User, socialUser, SOCIAL_NAME.FACEBOOK);

          if (signedIn) {
            throw new Error('Email for current user is already signed in');
          }
        }

        const user = await getOrSignUp(User, socialUser, SOCIAL_NAME.FACEBOOK);

        if (!user) {
          throw new Error('Failed to sign up.');
        }

        const { id: userId } = user;
        const token: Token = signIn(userId, appSecret);

        return {
          token,
          user,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    signUp: async (
      _, {
        user,
      }, {
        appSecret,
        models,
        pubsub,
      }) => {
      const { password } = user;
      const { User } = models;
      const signedIn = await isSignedIn(User, user);

      if (signedIn) {
        throw new Error('Email for current user is already signed in');
      }

      const encryptedPassword = await encryptPassword(password);
      const userToCreate = {
        ...user,
        password: encryptedPassword,
      };

      const createdUser = await User.create(userToCreate, { raw: true });
      const token: string = signIn(createdUser.id, appSecret);

      pubsub.publish(USER_ADDED, {
        userAdded: createdUser,
      });

      return {
        token,
        user: createdUser,
      };
    },
    updateProfile: async (
      _,
      args, {
        getUser: getSignedInUser,
        models,
        pubsub,
      }) => {
      const { User } = models;
      const { user } = args;
      const { id } = user;
      const signedInUser = await getSignedInUser();

      if (!signedInUser) throw new AuthenticationError('User is not signed in');
      if (!isValidUser(signedInUser, user)) {
        throw new AuthenticationError(
          'User can update his or her own profile',
        );
      }

      try {
        const updatedUser = await udpateUser({ User }, id, args);
        pubsub.publish(USER_UPDATED, { updatedUser });

        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    userAdded: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED),
    },
    userUpdated: {
      subscribe: withFilter(
        (_, args, { pubsub }) => pubsub.asyncIterator(USER_UPDATED),
        (payload, user) => {
          const { userUpdated: updatedUser } = payload;

          return updatedUser.id === user.id;
        },
      ),
    },
  },
  User: {
    notifications: (user, args, { models }) => {
      const { id } = user;
      const { Notification } = models;

      return getNotificationsByUserId(Notification, id);
    },
    reviews: (user, args, { models }) => {
      const { id } = user;
      const { Review } = models;

      return getReviewsByUserId(Review, id);
    },
  },
};

export default resolver;
