import { BuildOptions, DataTypes, Model } from 'sequelize';

import Friend from './Friend';
import Gallery from './Gallery';
import Membership from './Membership';
import Message from './Message';
import Notification from './Notification';
import moment from 'moment';
import sequelize from '../db';

const {
  STRING,
  BOOLEAN,
  DATE,
  DATEONLY,
  UUID,
  UUIDV1,
  ENUM,
  TEXT,
} = DataTypes;

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export enum AuthType {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Apple = 'APPLE',
}

export class User extends Model {
  public id!: string;
  public email: string;
  public password: string;
  public name: string;
  public nickname: string;
  public thumbUrl: string;
  public photoURL: string;
  public birthday: Date;
  public gender: Gender;
  public socialId: string;
  public authType: AuthType;
  public verified: boolean;
  public statusMessage: string;
  public isOnline: boolean;
  public lastSignedIn: Date;
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
  thumbURL: STRING,
  photoURL: STRING,
  birthday: {
    type: DATEONLY,
    get: function(): string {
      return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
    },
  },
  gender: ENUM('MALE', 'FEMALE'),
  phone: STRING,
  socialId: STRING,
  authType: ENUM('EMAIL', 'FACEBOOK', 'GOOGLE', 'APPLE'),
  verified: {
    type: BOOLEAN,
    defaultValue: false,
  },
  statusMessage: TEXT,
  isOnline: BOOLEAN,
  lastSignedIn: DATE,
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  paranoid: true,
});

User.hasMany(Friend, { foreignKey: 'userId' });
User.hasMany(Friend, { foreignKey: 'friendId' });
User.hasMany(Notification, { foreignKey: 'userId' });
User.hasMany(Gallery, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });
User.hasMany(Membership, { foreignKey: 'userId' });

export const resetPassword = (email: string, password: string): Promise<[number, User[]]> => {
  return User.update(
    { password },
    {
      where: { email },
    },
  );
};

export const verifyEmail = (email: string): Promise<[number, User[]]> => {
  return User.update(
    { verified: true },
    {
      where: { email },
    },
  );
};

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
}

export default User as UserModelStatic;
