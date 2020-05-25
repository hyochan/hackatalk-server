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

class Reaction extends Model {
    public id!: string;
    public type: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Reaction.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  type: STRING,
}, {
  sequelize,
  modelName: 'reaction',
  timestamps: true,
  paranoid: true,
});

Reaction.belongsTo(Message, { as: 'message' });
Reaction.belongsTo(User, { as: 'user' });

export type ReactionModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): Reaction;
  }

export default Reaction as ReactionModelStatic;
