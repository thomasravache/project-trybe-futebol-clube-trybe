'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        }
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      away_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        }
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      in_progress: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BOOLEAN,
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
