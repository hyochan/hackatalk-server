import {
  AuthPayload,
  Notification,
  Resolvers,
  SocialUserCreateInput,
  User,
} from '../generated/graphql';
import { Role, encryptPassword, validatePassword } from '../utils/auth';

import { AuthType } from '../models/User';
import { AuthenticationError } from 'apollo-server-core';
import { ModelType } from '../models';
import jwt from 'jsonwebtoken';
import { withFilter } from 'apollo-server';

const USER_SIGNED_IN = 'USER_SIGNED_IN';
const USER_UPDATED = 'USER_UPDATED';

const signInWithSocialAccount = async (
  socialUser: SocialUserCreateInput,
  models: ModelType,
  appSecret: string,
): Promise<AuthPayload> => {
  if (socialUser.email) {
    const emailUser = await models.User.findOne({
      where: {
        email: socialUser.email,
        socialId: { $ne: socialUser.socialId },
      },
      raw: true,
    });

    if (emailUser) {
      throw new Error('Email for current user is already signed in');
    }
  }

  const user = await models.User.findOrCreate({
    where: { socialId: `${socialUser.socialId}` },
    defaults: {
      socialId: socialUser.socialId,
      authType: socialUser.authType,
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
    signInEmail: async (_, args, { models, appSecret, pubsub }): Promise<AuthPayload> => {
      const { User: userModel } = models;

      const user = await userModel.findOne({
        where: {
          email: args.email,
        },
        raw: true,
      });

      if (!user) throw new AuthenticationError('User does not exsists');

      const validate = await validatePassword(args.password, user.password);

      if (!validate) throw new AuthenticationError('Password is not correct');

      const token: string = jwt.sign(
        {
          userId: user.id,
          role: Role.User,
        },
        appSecret,
      );

      pubsub.publish(USER_SIGNED_IN, { user });
      return { token, user };
    },
  },
  Mutation: {
    signInGoogle: async (_, { socialUser }, { appSecret, models }): Promise<AuthPayload> =>
      signInWithSocialAccount(socialUser, models, appSecret),

    signInFacebook: async (_, { socialUser }, { appSecret, models }): Promise<AuthPayload> =>
      signInWithSocialAccount(socialUser, models, appSecret),

    signInApple: async (_, { socialUser }, { appSecret, models }): Promise<AuthPayload> =>
      signInWithSocialAccount(socialUser, models, appSecret),

    signUp: async (_, args, { appSecret, models }): Promise<AuthPayload> => {
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
      const user = await userModel.create(
        {
          ...args.user,
          authType: AuthType.Email,
        },
        { raw: true },
      );
      const token: string = jwt.sign(
        {
          userId: user.id,
          role: Role.User,
        },
        appSecret,
      );

      return { token, user };
    },
    updateProfile: async (_, args, { getUser, models, pubsub }): Promise<User> => {
      const { User: userModel } = models;

      try {
        const auth = await getUser();
        if (auth.id !== args.user.id) {
          throw new AuthenticationError(
            'User can update his or her own profile',
          );
        }
        userModel.update(
          args,
          {
            where: {
              id: args.user.id,
            },
          },
        );

        const user = await userModel.findOne({
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
    userSignedIn: {
      // issue: https://github.com/apollographql/graphql-subscriptions/issues/192
      // eslint-disable-next-line
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(USER_SIGNED_IN),
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
