"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Departments",
      [
        {
          name: "Sale",
          manager: "Hieu Pham",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          manager: "Hieu Pham",
          companyID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          manager: "Vinh Hoang",
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
