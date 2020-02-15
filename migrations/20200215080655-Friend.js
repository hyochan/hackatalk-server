'use strict';

const { DATE, UUID, UUIDV4 } = require('sequelize');

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
      },
      {
        charset: 'utf8',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('friends');
  }
};
