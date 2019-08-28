import { DataTypes, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import sequelize from '../db';

class Notification extends Model {}
Notification.init(
  {
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
  },
  {
    sequelize,
    modelName: 'notification',
    timestamps: true,
    paranoid: true,
  },
);

export default Notification;
