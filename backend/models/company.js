"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.AuthAccount, {
        foreignKey: "companyID",
      });
      this.hasMany(models.Department, {
        foreignKey: "companyID",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      typeOfCompany: DataTypes.STRING,
      mainBusinessLines: DataTypes.STRING,
      establishedDate: DataTypes.DATE,
      address: DataTypes.STRING,
      address2: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      fax: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      taxCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
