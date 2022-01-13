"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Company, {
        foreignKey: "companyID",
      });
      this.hasMany(models.Employee, {
        foreignKey: "departmentID",
      });
      this.hasMany(models.Project, {
        foreignKey: "departmentID",
      });
      this.belongsTo(models.Employee, {
        foreignKey: "managerID",
      });
    }
  }
  Department.init(
    {
      name: DataTypes.STRING,
      managerID: DataTypes.INTEGER,
      companyID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
