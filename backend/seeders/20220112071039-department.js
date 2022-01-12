"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Departments",
      [
        {
          name: "Sale",
          manager: "1",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          manager: "2",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          manager: "1",
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
