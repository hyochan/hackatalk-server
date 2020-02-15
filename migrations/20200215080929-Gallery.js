'use strict';

const { STRING, DATE, UUID, UUIDV4 } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'galleries',
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
      return queryInterface.dropTable('galleries');
  }
};
