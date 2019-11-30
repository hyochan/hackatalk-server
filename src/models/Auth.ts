import * as jwt from 'jsonwebtoken';

import { getUserByEmail, hasUser } from './User';

import { Role } from './Role';

export const { JWT_SECRET = 'undefined' } = process.env;

export type Token = string;

interface JwtUser {
  userId: string;
  role: number;
  iat: number;
}

export interface Auth {
  id: string;
  role: Role;
}

export const isValidUser = (signedInUser, user) => signedInUser.id === user.id;

export const isSignedIn = async (User, user, queryOptions = {}) => {
  const {
    email,
  } = user;

  const emailUser = getUserByEmail(User, email, queryOptions);

  if (emailUser) {
    return true;
  }

  return false;
};

export const isSignedInBySocial = async (
  User,
  socialUser,
  socialName,
) => {
  const {
    email,
  } = socialUser;

  return isSignedIn(User, socialUser, {
    where: {
      email,
      social: { $notLike: `${socialName}%` },
    },
  });
};

export const getOrSignUp = async (
  User,
  socialUser,
  socialName,
) => {
  const {
    email,
    name,
    nickname,
    photo,
    birthday,
    gender,
    phone,
    social,
  } = socialUser;

  const foundUser = User.findOrCreate({
    where: { social: `${socialName}_${social}` },
    defaults: {
      social: `${socialName}_${social}`,
      email,
      name,
      nickname,
      photo,
      birthday,
      gender,
      phone,
      verified: email || false,
    },
    raw: true,
  });

  if (hasUser(foundUser)) {
    return foundUser[0];
  }

  return null;
};

export const signIn = (userId, appSecret): Token => jwt.sign({
  userId,
  role: Role.User,
},
appSecret,
);

export const verifyUser = (token) => {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
};
