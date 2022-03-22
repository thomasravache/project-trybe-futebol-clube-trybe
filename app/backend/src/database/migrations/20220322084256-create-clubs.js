'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clubs', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      club_name: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('clubs');
  }
};
