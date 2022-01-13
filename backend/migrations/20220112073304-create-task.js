"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectID: {
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      assignerID: {
        type: Sequelize.INTEGER,
        references: {
          model: "authAccounts",
          key: "id",
        },
      },
      assigneeID: {
        type: Sequelize.INTEGER,
        references: {
          model: "authAccounts",
          key: "id",
        },
      },
      priority: {
        type: Sequelize.INTEGER,
      },
      difficulty: {
        type: Sequelize.INTEGER,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      progress: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
