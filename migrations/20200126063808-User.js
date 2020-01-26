'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.renameColumn(
      'users',
      'status',
      'statusMessage',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'users',
      'statusMessage',
      'status',
    );
  }
};
