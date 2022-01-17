'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeKpiCluster extends Model {
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
  };
  employeeKpiCluster.init({
    employeeID: DataTypes.INTEGER,
    kpi: DataTypes.DOUBLE,
    lables: DataTypes.INTEGER,
    centoroid: DataTypes.DOUBLE,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'employeeKpiCluster',
  });
  return employeeKpiCluster;
};