import {
  BuildOptions,
  Model,
  STRING,
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';

import Channel from './Channel';
import Photo from './Photo';
import Reply from './Reply';
import User from './User';
import sequelize from '../db';

export enum MessageType {
  Text = 'TEXT',
  File = 'FILE',
}

export class Message extends Model {
  public id!: string;
  public channelId!: string;
  public senderId!: string;
  public type!: string;
  public text: string;
  public filePath: string;
  public readCount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Message.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  text: TEXT,
  filePath: STRING,
}, {
  sequelize,
  modelName: 'message',
  timestamps: true,
});

// Message.belongsTo(Channel, { as: 'channel' });
// Message.belongsTo(User, { as: 'sender' });
Message.hasMany(Reply, { foreignKey: 'id' });
Message.hasMany(Photo, { foreignKey: 'id' });

export type MessageModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Message;
}

export default Message as MessageModelStatic;
