'use strict';

const {
  ENUM,
  STRING,
  DATE,
  UUID,
  UUIDV4
} = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'channels',
      {
        id: {
          type: UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: ENUM('PRIVATE', 'PUBLIC'),
          defaultValue: 'PRIVATE',
        },
        name: {
          type: STRING,
        },
        createdAt: {
          type: DATE
        },
        updatedAt: {
          type: DATE
        },
        deletedAt: {
          type: DATE
        },
      },
      {
        charset: 'utf8mb4',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('channels');
  }
};
