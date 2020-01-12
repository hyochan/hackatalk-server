import {
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import User from './User';
import sequelize from '../db';

class Notification extends Model {}
Notification.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  device: STRING,
  os: STRING,
}, {
  sequelize,
  modelName: 'notification',
  timestamps: true,
  paranoid: true,
});

Notification.belongsTo(User);

export const getNotificationsByUserId = (Notification, userId) => {
  return Notification.findAll({
    where: {
      userId,
    },
  });
};

export default Notification;
