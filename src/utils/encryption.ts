import * as bcrypt from 'bcrypt-nodejs';

const SALT_ROUND = 10;

export const encryptPassword = async (password: string) => {
  const SALT = bcrypt.genSaltSync(SALT_ROUND);
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, null, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

export const checkPassword = async (password: string, hash: string) => {
  const comparedPassword: boolean = await new Promise<boolean>(
    (resolve, reject) => {
      bcrypt.compare(password, hash, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    },
  );

  return comparedPassword;
};
