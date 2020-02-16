'use strict';

const {
  STRING,
  TEXT,
  DATE,
  UUID,
  UUIDV4
} = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'replies',
      {
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
        text: {
          type: TEXT
        },
        filePath: {
          type: STRING
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
        messageId: {
          type: UUID,
          references: {
            model: 'messages',
            key: 'id'
          },
          allowNull: true,
        },
        userId: {
          type: UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          allowNull: true
        },
      },
      {
        charset: 'utf8mb4',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('replies');
  }
};
