'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoomDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ChatRoomDetails.init({
    chatRoomID: DataTypes.INTEGER,
    memberID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatRoomDetails',
  });
  return ChatRoomDetails;
};