"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Departments",
      [
        {
          name: "Sale",
          managerID: "1",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          managerID: "2",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          managerID: "1",
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
