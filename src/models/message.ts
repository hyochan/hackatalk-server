import { DataTypes, Model, STRING } from 'sequelize';

import sequelize from '../db';
import User from './user';

// const Message = sequelize.define('message', {
//   text: DataTypes.STRING,
// });

// Message.belongsTo(User, {
//   foreignKey: {
//     name: 'userId',
//     field: 'userid',
//   },
// });

class Message extends Model {};
Message.init({
  title: {
    type: STRING,
    allowNull: false,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'message' });

Message.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    field: 'userId',
  },
});

export default Message;
