import {
  BuildOptions,
  ENUM,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import Membership from './Membership';
import Message from './Message';
import sequelize from '../db';

export enum ChannelType {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

class Channel extends Model {
  public id!: string;
  public type!: ChannelType;
  public name: string;
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
  type: {
    type: ENUM('PRIVATE', 'PUBLIC'),
    defaultValue: ChannelType.Private,
  },
  name: {
    type: STRING,
  },
}, {
  sequelize,
  modelName: 'channel',
  timestamps: true,
  paranoid: true,
});

Channel.hasMany(Membership, { foreignKey: 'channelId' });
Channel.hasMany(Message, { foreignKey: 'channelId' });

export type ChannelModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Channel;
}

export default Channel as ChannelModelStatic;
