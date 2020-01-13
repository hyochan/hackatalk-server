import * as jwt from 'jsonwebtoken';

export const { JWT_SECRET = 'undefined' } = process.env;

export type Token = string;

interface JwtUser {
  userId: string;
  role: number;
  iat: number;
}
export enum Role {
  User,
  Admin,
}

export interface Auth {
  id: string;
  role: Role;
}

export const verifyUser = (token: string): JwtUser => {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
};
