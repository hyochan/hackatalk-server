import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const SALT_ROUND = 10;

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

export const encryptPassword = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const SALT = bcrypt.genSaltSync(SALT_ROUND);

    bcrypt.hash(password, SALT, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });

export const validatePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      return reject(err);
    }
    resolve(res);
  });
});
