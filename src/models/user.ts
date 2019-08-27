import { DataTypes, Model } from 'sequelize';

import sequelize from '../db';

const { STRING, BOOLEAN, INTEGER, BIGINT, TEXT, UUID, UUIDV1 } = DataTypes;
// const User = sequelize.define('user', {
//   id: {
//     type: UUID,
//     defaultValue: UUIDV1,
//     allowNull: false,
//     primaryKey: true,
//   },
//   email: {
//     type: STRING,
//     unique: true,
//   },
//   password: STRING,
//   name: {
//     type: STRING,
//   },
// });

// export default User;

class User extends Model {};
User.init({
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
}, { sequelize, modelName: 'user' });

export default User;
