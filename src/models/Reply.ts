import {
  BuildOptions,
  Model,
  STRING,
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';

import Message from './Message';
import User from './User';
import sequelize from '../db';

class Reply extends Model {
  public id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Reply.init({
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
  modelName: 'reply',
  timestamps: true,
  paranoid: true,
});

Reply.belongsTo(Message, { as: 'message' });
Reply.belongsTo(User, { as: 'user' });

export type ReplyModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Reply;
}

export default Reply as ReplyModelStatic;
