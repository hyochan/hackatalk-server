'use strict';

const { ENUM, STRING, DATEONLY, BOOLEAN, TEXT, DATE, UUID, UUIDV1 } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: UUID,
          defaultValue: UUIDV1,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: STRING,
        },
        password: {
          type: STRING,
          allowNull: true,
        },
        name: {
          type: STRING,
        },
        nickname: {
          type: STRING,
        },
        thumbUrl: {
          type: STRING,
        },
        photoURL: {
          type: STRING,
        },
        birthday: {
          type: DATEONLY,
          get: function() {
            return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
          },
        },
        gender: ENUM('MALE', 'FEMALE'),
        phone: {
          type: STRING,
        },
        socialId: {
          type: STRING,
        },
        authType: ENUM('EMAIL', 'FACEBOOK', 'GOOGLE', 'APPLE'),
        verified: {
          type: BOOLEAN,
          defaultValue: false,
        },
        statusMessage: {
          type: TEXT,
        },
        isOnline: {
          type: BOOLEAN,
        },
        lastSignedIn: {
          type: DATE,
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
    return queryInterface.dropTable('users');
  }
};
