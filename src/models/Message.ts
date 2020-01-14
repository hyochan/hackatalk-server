import {
  BuildOptions,
  INTEGER,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import Channel from './Channel';
import User from './User';
import sequelize from '../db';

class Message extends Model {
  public id!: string;

  public channelId!: string;

  public senderId!: string;

  public type!: string;

  public text: string;

  public photoUrl: string;

  public audioUrl: string;

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
  channelId: {
    type: UUID,
    allowNull: false,
  },
  senderId: {
    type: UUID,
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  text: STRING,
  photoUrl: STRING,
  audioUrl: STRING,
  readCount: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'message',
  timestamps: true,
  paranoid: true,
});

Message.belongsTo(Channel, {
  as: 'channel',
});
Message.belongsTo(User, {
  as: 'sender',
});

export type MessageModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Message;
}

export default Message as MessageModelStatic;
