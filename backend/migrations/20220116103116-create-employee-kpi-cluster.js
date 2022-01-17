'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employeeKpiClusters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeID: {
        type: Sequelize.INTEGER
      },
      kpi: {
        type: Sequelize.DOUBLE
      },
      lables: {
        type: Sequelize.INTEGER
      },
      centoroid: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employeeKpiClusters');
  }
};