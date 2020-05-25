import {
  BuildOptions,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import User from './User';
import sequelize from '../db';

class Notification extends Model {
  public id!: string;
  public token: string;
  public device: string;
  public os: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
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
});

// Notification.belongsTo(User, { as: 'user' });

export type NotificationModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Notification;
}

export default Notification as NotificationModelStatic;
