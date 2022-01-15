"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: "employeeID",
      });
    }
  }
  EmployeeAchievement.init(
    {
      employeeID: DataTypes.INTEGER,
      date: DataTypes.DATE,
      achievement: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmployeeAchievement",
    }
  );
  return EmployeeAchievement;
};
