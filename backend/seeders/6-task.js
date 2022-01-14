"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          projectID: "1",
          name: "Improve FE",
          assignerID: "1",
          assigneeID: "1",
          priority: "1",
          difficulty: "3",
          dueDate: "2020-12-16",
          progress: "50",
          customer: "Customer 1",
          status: "Pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectID: "1",
          name: "Improve BE",
          assignerID: "1",
          assigneeID: "2",
          priority: "2",
          difficulty: "3",
          dueDate: "2021-09-08",
          progress: "50",
          customer: "Customer 2",
          status: "In Progress",
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
