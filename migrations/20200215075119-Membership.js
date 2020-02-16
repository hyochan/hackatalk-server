'use strict';

const {
  ENUM,
  BOOLEAN,
  DATE,
  UUID,
  UUIDV4
} = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'memberships',
      {
        id: {
          type: UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: ENUM('OWNER', 'MEMBER'),
          defaultValue: 'MEMBER',
        },
        userAlert: {
          type: BOOLEAN,
        },
        userMode: {
          type: ENUM('DEFAULT', 'HIDDEN', 'BLOCK'),
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
        userId: {
          type: UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          allowNull: true
        },
        channelId: {
          type: UUID,
          references: {
            model: 'channels',
            key: 'id'
          },
          allowNull: true,
        },
      },
      {
        charset: 'utf8mb4',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('memberships');
  }
};
