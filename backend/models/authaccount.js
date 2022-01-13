"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuthAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Company);
    }
  }
  AuthAccount.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      privilege: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuthAccount",
    }
  );
  return AuthAccount;
};
