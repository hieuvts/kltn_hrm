"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Department, {
        foreignKey: "departmentID",
      });
      this.belongsTo(models.AuthAccount, {
        foreignKey: "authAccountID",
      });
      this.hasMany(models.EmploymentHistory, {
        foreignKey: "employeeID",
      });
      this.hasMany(models.EmployeeAchievement, {
        foreignKey: "employeeID",
      });
    }
  }
  Employee.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      gender: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      position: DataTypes.STRING,
      departmentID: DataTypes.INTEGER,
      authAccountID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
