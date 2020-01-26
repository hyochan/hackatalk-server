'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'users',
      'thumbURL',
      {
        type: Sequelize.STRING,
        before: "photoURL",
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'thumbURL',
    );
  }
};
