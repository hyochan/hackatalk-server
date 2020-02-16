'use strict';

const {
  DATE,
  UUID,
  UUIDV4
} = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'friends',
      {
        id: {
          type: UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          primaryKey: true,
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
        friendId: {
          type: UUID,
          references: {
            model: 'users',
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
      return queryInterface.dropTable('friends');
  }
};
