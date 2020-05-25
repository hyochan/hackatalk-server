import {
  BuildOptions,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import User from './User';
import sequelize from '../db';

class Gallery extends Model {
  public id!: string;
  public photoURL!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
Gallery.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  photoURL: STRING,
}, {
  sequelize,
  modelName: 'gallery',
  timestamps: true,
  paranoid: true,
});

// Gallery.belongsTo(User, { as: 'user' });

export type GalleryModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Gallery;
}

export default Gallery as GalleryModelStatic;
