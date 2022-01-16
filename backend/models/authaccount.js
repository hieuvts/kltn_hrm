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
      this.belongsTo(models.Company, {
        foreignKey: "companyID",
      });
      this.belongsToMany(models.ChatRoom, {
        through: models.ChatRoomDetails,
        foreignKey: "memberID",
        onDelete: "cascade",
      });
      this.hasOne(models.Employee, {
        foreignKey: "authAccountID",
      });
    }
  }
  AuthAccount.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      privilege: DataTypes.STRING,
      companyID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AuthAccount",
    }
  );
  return AuthAccount;
};
