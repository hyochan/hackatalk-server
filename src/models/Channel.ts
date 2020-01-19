import {
  BuildOptions,
  ENUM,
  Model,
  UUID,
  UUIDV4,
} from 'sequelize';

import sequelize from '../db';

class Channel extends Model {
  public id!: string;
  public type!: string;
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
  },
}, {
  sequelize,
  modelName: 'channel',
  timestamps: true,
  paranoid: true,
});

export type ChannelModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Channel;
}

export default Channel as ChannelModelStatic;
