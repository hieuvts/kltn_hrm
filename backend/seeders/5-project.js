"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "Improve company website",
          startDate: "2021-04-14",
          endDate: "2022-01-06",
          departmentID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Redesign company internal chat application",
          startDate: "2021-02-11",
          endDate: "2022-01-10",
          departmentID: "1",
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
