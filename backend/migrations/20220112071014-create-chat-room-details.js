"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ChatRoomDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chatRoomID: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },
      memberID: {
        type: Sequelize.INTEGER,
        references: {
          model: "authaccounts",
          key: "id",
        },
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
    await queryInterface.dropTable("ChatRoomDetails");
  },
};
