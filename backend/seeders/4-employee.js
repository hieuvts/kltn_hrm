"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          fname: "Hieu",
          lname: "Pham",
          gender: "Male",
          dateOfBirth: "2014-07-13",
          phoneNumber: "0359545405",
          email: "hieu@gmail.com",
          address: "Trang Bom, Dong nai",
          position: "Manager",
          departmentID: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fname: "Vinh",
          lname: "Hoang",
          gender: "Male",
          dateOfBirth: "2015-07-13",
          phoneNumber: "0341040481",
          email: "vinh@gmail.com",
          address: "Tan Binh, TP. Ho Chi Minh",
          position: "Manager",
          departmentID: "2",
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
