'use strict';

const { STRING, TEXT, DATE, UUID, UUIDV4 } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'messages',
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
      },
      {
        charset: 'utf8',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('messages');
  }
};
