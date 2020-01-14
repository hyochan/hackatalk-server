import {
  BuildOptions,
  Model,
  UUID,
  UUIDV4,
} from 'sequelize';

import User from './User';
import sequelize from '../db';

class Channel extends Model {
  public id!: string;
  public ownerId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
Channel.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  ownerId: {
    type: UUID,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'channel',
  timestamps: true,
  paranoid: true,
});

Channel.belongsTo(User, {
  as: 'owner',
});

export type ChannelModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Channel;
}

export default Channel as ChannelModelStatic;
