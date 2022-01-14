"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ChatRoomDetails",
      [
        {
          chatRoomID: "1",
          memberID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatRoomID: "1",
          memberID: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatRoomID: "1",
          memberID: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatRoomID: "2",
          memberID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatRoomID: "2",
          memberID: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
