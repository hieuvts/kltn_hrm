"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmploymentHistory extends Model {
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
  EmploymentHistory.init(
    {
      employeeID: DataTypes.INTEGER,
      date: DataTypes.DATE,
      event: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmploymentHistory",
    }
  );
  return EmploymentHistory;
};
