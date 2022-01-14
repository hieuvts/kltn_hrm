"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ChatMessage);
      this.belongsToMany(models.AuthAccount, {
        through: models.ChatRoomDetails,
        foreignKey: "chatRoomID",
        onDelete: "cascade",
      });
    }
  }
  ChatRoom.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChatRoom",
    }
  );
  return ChatRoom;
};
