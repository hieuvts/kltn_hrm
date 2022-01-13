"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ChatMessages",
      [
        {
          senderEmail: "hieu@gmail.com",
          chatRoomID: "1",
          message: "Hello all!",
          isBroadcast: false,
          createdAt: "2022-01-05 15:00:48",
          updatedAt: new Date(),
        },
        {
          senderEmail: "hieu@gmail.com",
          chatRoomID: "1",
          message: "Test message!",
          isBroadcast: false,
          createdAt: "2022-01-05 15:00:50",
          updatedAt: new Date(),
        },
        {
          senderEmail: "vinh@gmail.com",
          chatRoomID: "1",
          message: "Hi fen",
          isBroadcast: false,
          createdAt: "2022-01-05 16:10:48",
          updatedAt: new Date(),
        },
        {
          senderEmail: "hung@gmail.com",
          chatRoomID: "1",
          message: "Hello!",
          isBroadcast: false,
          createdAt: "2022-01-05 16:20:48",
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
