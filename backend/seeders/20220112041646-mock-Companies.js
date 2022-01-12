"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert
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
          taxCode: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  // Revert inserted datat
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Companies", null, {});
  },
};
