import {
  BOOLEAN,
  BuildOptions,
  ENUM,
  Model,
  UUID,
  UUIDV4,
} from 'sequelize';

import Channel from './Channel';
import User from './User';
import sequelize from '../db';

export enum MemberType {
  Owner = 'OWNER',
  Member = 'MEMBER'
}

class Membership extends Model {
  public id!: string;
  public channelId!: string;
  public userId!: string;
  public type: MemberType;
  public alert: boolean;
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
  type: {
    type: ENUM('OWNER', 'MEMBER'),
    defaultValue: MemberType.Member,
  },
  userAlert: {
    type: BOOLEAN,
  },
  userMode: {
    type: ENUM('DEFAULT', 'HIDDEN', 'BLOCK'),
  },
}, {
  sequelize,
  // indexes: [{ unique: true, fields: ['channelId', 'userId'] }],
  modelName: 'membership',
  timestamps: true,
  paranoid: true,
});

// Membership.belongsTo(Channel, { as: 'channel' });
// Membership.belongsTo(User, { as: 'user' });

export type MembershipModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Membership;
}

export default Membership as MembershipModelStatic;
