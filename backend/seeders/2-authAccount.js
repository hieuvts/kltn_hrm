"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "authAccounts",
      [
        {
          email: "hieu@gmail.com",
          password: "password",
          privilege: "admin",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "vinh@gmail.com",
          password: "password",
          privilege: "admin",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "hung@gmail.com",
          password: "password",
          privilege: "moderator",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "adminComp2@gmail.com",
          password: "password",
          privilege: "admin",
          companyID: "2",
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
