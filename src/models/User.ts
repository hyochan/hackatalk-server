import { DataTypes, Model } from 'sequelize';

import sequelize from '../db';

const { STRING, UUID, UUIDV1 } = DataTypes;

class User extends Model {}
User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: STRING,
      unique: true,
    },
    password: STRING,
    name: {
      type: STRING,
    },
  },
  { sequelize, modelName: 'user' },
);

export default User;
