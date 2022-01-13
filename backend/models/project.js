"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Department, {
        foreignKey: "departmentID",
      });
      this.hasMany(models.Task, {
        foreignKey: "projectID",
      });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      departmentID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
