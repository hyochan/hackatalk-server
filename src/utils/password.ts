import * as bcrypt from 'bcrypt-nodejs';

const SALT_ROUND = 10;

export const encryptPassword = async (password: string) => new Promise((resolve, reject) => {
  const SALT = bcrypt.genSaltSync(SALT_ROUND);

  bcrypt.hash(password, SALT, null, (err, hash) => {
    if (err) {
      reject(err);

      return;
    }

    resolve(hash);
  });
});

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => new Promise<boolean>((resolve, reject) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      reject(err);

      return;
    }

    resolve(res);
  });
});
