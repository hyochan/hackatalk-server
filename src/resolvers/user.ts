import {
  AuthPayload,
  Channel,
  Notification,
  Resolvers,
  SocialUserInput,
  User,
} from '../generated/graphql';
import { Role, encryptCredential, validateCredential, validateEmail } from '../utils/auth';

import { AuthType } from '../models/User';
import { AuthenticationError } from 'apollo-server-core';
import { ModelType } from '../models';
import SendGridMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import qs from 'querystring';
import { withFilter } from 'apollo-server';

const USER_SIGNED_IN = 'USER_SIGNED_IN';
const USER_UPDATED = 'USER_UPDATED';

const signInWithSocialAccount = async (
  socialUser: SocialUserInput,
  models: ModelType,
  appSecret: string,
): Promise<AuthPayload> => {
  const { User: userModel } = models;

  if (socialUser.email) {
    const emailUser = await userModel.findOne({
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

  const user = await userModel.findOrCreate({
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
    me: async (_, args, { getUser }): Promise<User> => {
      const auth = await getUser();
      return auth;
    },
    users: async (_, args, { getUser, models }): Promise<User[]> => {
      const { User: userModel } = models;
      const auth = await getUser();

      if (!auth) throw new AuthenticationError('User is not signed in');

      if (args.includeUser) {
        return userModel.findAll({
          where: {
            userId: { $ne: auth.id },
          },
        });
      }

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

      const validate = await validateCredential(args.password, user.password);

      if (!validate) throw new AuthenticationError('Password is not correct');

      const token: string = jwt.sign(
        {
          userId: user.id,
          role: Role.User,
        },
        appSecret,
      );

      pubsub.publish(USER_SIGNED_IN, { userSignedIn: user });
      return { token, user };
    },
    findPassword: async (_, args): Promise<boolean> => {
      const email = args.email;

      if (!email || !validateEmail(email)) {
        throw new Error('Not a valid email address');
      }

      const hashedEmail = await encryptCredential(email);

      const msg = {
        to: email,
        from: 'noreply@hackatalk.dev',
        subject: '[HackaTalk] Change your password!',
        html: `
By clicking on
<a href=
"${process.env.REDIRECT_URL}/reset_password/${qs.escape(email)}/${qs.escape(hashedEmail)}"
>RESET PASSWORD</a>,
your password will reset to <strong>dooboolab2017</strong>.
        `,
      };
      try {
        await SendGridMail.send(msg);
        return true;
      } catch (err) {
        throw new Error(`email sent failed\n${err.message}`);
      }
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

      args.user.password = await encryptCredential(args.user.password);
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
      try {
        const auth = await getUser();
        if (!auth) {
          throw new AuthenticationError(
            'User is not logged in',
          );
        }
        models.User.update(
          args.user,
          {
            where: {
              id: auth.id,
            },
          },
        );

        const user = await models.User.findOne({
          where: {
            id: auth.id,
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
        (payload, { userId }) => {
          const { userUpdated: updatedUser } = payload;
          return updatedUser.id === userId;
        },
      ),
    },
  },
  User: {
    channels: async (_, args, { models }): Promise<Channel[]> => {
      const { id } = _;
      const { Channel: channelModel, User: userModel } = models;

      const channels = await channelModel.findAll({
        where: {
          $or: [{
            ownerId: { $eq: id },
            userId: { $eq: id },
          }],
        },
        include: [
          {
            model: userModel,
            as: 'owner',
          },
        ],
      });

      return channels;
    },
    notifications: (_, args, { models }): Promise<Notification[]> => {
      const { id } = _;
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
