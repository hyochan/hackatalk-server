import { ErrorUserNotSignedIn } from '../utils/error';
import { JwtUser } from '../types';
import bcrypt from 'bcrypt-nodejs';
import qs from 'querystring';

const SALT_ROUND = 10;

export const { JWT_SECRET = 'undefined' } = process.env;

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const encryptCredential = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const SALT = bcrypt.genSaltSync(SALT_ROUND);

    bcrypt.hash(password, SALT, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });

export const validateCredential = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
  bcrypt.compare(value, hashedValue, (err, res) => {
    if (err) {
      return reject(err);
    }
    resolve(res);
  });
});

export const getEmailVerificationHTML = (email: string, hashedEmail: string): string => `
By visiting below url link, you are able to signin to <strong>HackaTalk</strong> 🙌.<br/><br/>
${process.env.REDIRECT_URL}/verify_email/${qs.escape(email)}/${qs.escape(hashedEmail)}
`;

export const getPasswordResetHTML = (email: string, hashedEmail: string): string => `
By visiting below url link, your password will reset to <strong>dooboolab2017</strong>. <br/><br/>
${process.env.REDIRECT_URL}/reset_password/${qs.escape(email)}/${qs.escape(hashedEmail)}
`;

export const checkAuth = (auth: JwtUser): void => {
  if (!auth) throw ErrorUserNotSignedIn;
};
