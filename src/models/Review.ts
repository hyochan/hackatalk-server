import {
  DECIMAL,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';

import sequelize from '../db';

class Review extends Model {}
Review.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: STRING,
  content: STRING,
  rating: {
    type: DECIMAL(2, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'review',
  timestamps: true,
  paranoid: true,
});

export const getReviewsByUserId = (Review, userId) => {
  return Review.findAll({
    where: {
      userId,
    },
  });
};

export default Review;
