'use strict';

const {
  STRING,
  DATE,
  UUID,
  UUIDV4
} = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'photos',
      {
        id: {
          type: UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        photoURL: {
          type: STRING
        },
        thumbURL: {
          type: STRING
        },
        channelId: {
          type: UUID,
          references: {
            model: 'channels',
            key: 'id'
          },
          allowNull: true,
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
      },
      {
        charset: 'utf8',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('photos');
  }
};
