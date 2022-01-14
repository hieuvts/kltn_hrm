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
          model: "ChatRooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      memberID: {
        type: Sequelize.INTEGER,
        references: {
          model: "AuthAccounts",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ChatRoomDetails");
  },
};
