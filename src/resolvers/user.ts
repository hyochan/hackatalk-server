import {
  AuthPayload,
  Notification,
  Resolvers,
  SocialUserCreateInput,
  User,
} from '../generated/graphql';
import { Role, encryptPassword } from '../utils/auth';

import { AuthenticationError } from 'apollo-server-core';
import { ModelType } from '../models';
import jwt from 'jsonwebtoken';
import { withFilter } from 'apollo-server';

enum SocialSignInType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
};

const USER_ADDED = 'USER_ADDED';
const USER_UPDATED = 'USER_UPDATED';

const signInWithSocialAccount = async (
  type: SocialSignInType,
  socialUser: SocialUserCreateInput,
  models: ModelType,
  appSecret: string,
): Promise<AuthPayload> => {
  if (socialUser.email) {
    const emailUser = await models.User.findOne({
      where: {
        email: socialUser.email,
        social: { $notLike: 'facebook%' },
      },
      raw: true,
    });

    if (emailUser) {
      throw new Error('Email for current user is already signed in');
    }
  }

  const user = await models.User.findOrCreate({
    where: { social: `${type}_${socialUser.social}` },
    defaults: {
      social: `${type}_${socialUser.social}`,
      email: socialUser.email,
      nickname: socialUser.name,
      name: socialUser.name,
      birthday: socialUser.birthday,
      gender: socialUser.gender,
      phone: socialUser.phone,
      verified: false,
    },
  });

  if (!user || (user && user[1] === false)) {
    // user already exists
  }

  const token: string = jwt.sign(
    {
      userId: user[0].id,
      role: Role.User,
    },
    appSecret,
  );
  return { token, user: user[0] };
};

const resolver: Resolvers = {
  Query: {
    users: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<User[]> => {
      const { User: userModel } = models;
      const user = await getUser();

      if (!user) throw new AuthenticationError('User is not signed in');

      return userModel.findAll();
    },
    user: (_, args, { models }): Promise<User> => {
      const { User } = models;

      return User.findOne({ where: args });
    },
  },
  Mutation: {
    signInGoogle: async (_, { socialUser }, { appSecret, models }): Promise<AuthPayload> =>
      signInWithSocialAccount(SocialSignInType.GOOGLE, socialUser, models, appSecret),

    signInFacebook: async (_, { socialUser }, { appSecret, models }): Promise<AuthPayload> =>
      signInWithSocialAccount(SocialSignInType.FACEBOOK, socialUser, models, appSecret),

    signInApple: async (_, { socialUser }, { appSecret, models }): Promise<AuthPayload> =>
      signInWithSocialAccount(SocialSignInType.APPLE, socialUser, models, appSecret),

    signUp: async (_, args, { appSecret, models, pubsub }): Promise<AuthPayload> => {
      const { User: userModel } = models;

      const emailUser = await userModel.findOne({
        where: {
          email: args.user.email,
        },
        raw: true,
      });

      if (emailUser) {
        throw new Error('Email for current user is already signed up.');
      }

      args.user.password = await encryptPassword(args.user.password);
      const user = await userModel.create(args.user, { raw: true });
      const token: string = jwt.sign(
        {
          userId: user.id,
          role: Role.User,
        },
        appSecret,
      );

      pubsub.publish(USER_ADDED, {
        userAdded: user,
      });

      return { token, user };
    },
    updateProfile: async (_, args, { getUser, models, pubsub }): Promise<User> => {
      try {
        const auth = await getUser();
        if (auth.id !== args.user.id) {
          throw new AuthenticationError(
            'User can update his or her own profile',
          );
        }
        models.User.update(
          args,
          {
            where: {
              id: args.user.id,
            },
          },
        );

        const user = await models.User.findOne({
          where: {
            id: args.user.id,
          },
          raw: true,
        });

        pubsub.publish(USER_UPDATED, { user });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    userAdded: {
      // eslint-disable-next-line
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED),
    },
    userUpdated: {
      subscribe: withFilter(
        (_, args, { pubsub }) => {
          return pubsub.asyncIterator(USER_UPDATED, { user: args.user });
        },
        (payload, user) => {
          const { userUpdated: updatedUser } = payload;

          return updatedUser.id === user.id;
        },
      ),
    },
  },
  User: {
    notifications: (parent, args, { models }): Promise<Notification[]> => {
      const { id } = parent;
      const { Notification: notificationModel } = models;

      return notificationModel.findAll({
        where: {
          userId: id,
        },
      });
    },
  },
};

export default resolver;
