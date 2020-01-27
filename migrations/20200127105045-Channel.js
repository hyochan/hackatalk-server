'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'channels',
      'name',
      {
        type: Sequelize.STRING,
        after: "type",
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'channels',
      'name',
    );
  }
};
