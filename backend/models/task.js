'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    projectID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    assignerID: DataTypes.INTEGER,
    assigneeID: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    difficulty: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    progress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};