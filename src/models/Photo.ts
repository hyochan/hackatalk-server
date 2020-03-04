import {
  BuildOptions,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import { Message } from './Message';
import sequelize from '../db';

class Photo extends Model {
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

Photo.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  photoURL: STRING,
  thumbURL: STRING,
}, {
  sequelize,
  modelName: 'photo',
  timestamps: true,
  paranoid: true,
});

// Photo.belongsTo(Message, { as: 'message' });

export type PhotoModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Photo;
}

export default Photo as PhotoModelStatic;
