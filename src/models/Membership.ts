import {
  BuildOptions,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import Channel from './Channel';
import User from './User';
import sequelize from '../db';

class Membership extends Model {
  public id!: string;
  public channelId!: string;
  public userId!: string;
  public type: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
Membership.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  channelId: {
    type: UUID,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  type: {
    type: STRING,
  },
}, {
  sequelize,
  modelName: 'membership',
  timestamps: true,
  paranoid: true,
});

Membership.belongsTo(Channel, {
  as: 'channel',
});

Membership.belongsTo(User, {
  as: 'user',
});

export type MembershipModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Membership;
}

export default Membership as MembershipModelStatic;
