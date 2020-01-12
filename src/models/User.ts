import { DataTypes, Model } from 'sequelize';

import sequelize from '../db';

const {
  STRING,
  BOOLEAN,
  DATE,
  UUID,
  UUIDV1,
  ENUM,
} = DataTypes;

enum Gender {
  Male,
  Femaile,
}

class User extends Model {
  public id!: string;

  public email: string;

  public password: string;

  public name: string;

  public nickname: string;

  public photo: string;

  public birthday: Date;

  public gender: Gender;

  public social: string;

  public verified: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}
User.init({
  id: {
    type: UUID,
    defaultValue: UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
    allowNull: true,
  },
  name: STRING,
  nickname: STRING,
  photo: STRING,
  birthday: DATE,
  gender: ENUM('MALE', 'FEMALE'),
  phone: STRING,
  social: STRING,
  verified: {
    type: BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  paranoid: true,
});

export const udpateUser = async ({
  User,
},
  id,
  userData,
) => {
  return User.update(
    userData, {
      where: {
        id,
      },
    },
    { raw: true },
  );
};

export const getUsers = async (User) => User.findAll();

export const getUserById = async (User, id, options = {}) => {
  return User.findOne({
    where: {
      id,
    },
    raw: true,
    ...options,
  });
};

export const getUserByEmail = (User, email, queryOptions) => User.findOne({
  raw: true,
  where: {
    email,
  },
  ...queryOptions,
});

export const hasUser = (user) => {
  return !user || (user && user[1] === false);
};

export default User;
