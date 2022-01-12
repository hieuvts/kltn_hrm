"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Companies",
      [
        {
          name: "HRM Company",
          typeOfCompany: "Limited",
          mainBusinessLines: "Computer Development",
          establishedDate: "2005-10-10",
          address: "Linh Trung, Thu Duc",
          address2: "Linh Trung, Thu Duc",
          phoneNumber: "0359545405",
          fax: "0359545405",
          email: "contact@companyhrm.com",
          website: "https://companyhrm.com",
          taxCode: "256897331",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test company 2",
          typeOfCompany: "State-owned",
          mainBusinessLines: "Real estate",
          establishedDate: "2005-10-10",
          address: "Linh Trung, Thu Duc",
          address2: "Linh Trung, Thu Duc",
          phoneNumber: "0359545405",
          fax: "0359545405",
          email: "contact@testCompany2.com",
          website: "https://testCompany2.com",
          taxCode: "1234567889",
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
