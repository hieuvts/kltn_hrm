"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "authAccounts",
      [
        {
          email: "vinh@gmail.com",
          password: "password",
          privilege: "admin",
          companyID: "1",
        },
        {
          email: "hung@gmail.com",
          password: "password",
          privilege: "moderator",
          companyID: "1",
        },
        {
          email: "adminComp2@gmail.com",
          password: "password",
          privilege: "admin",
          companyID: "2",
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
