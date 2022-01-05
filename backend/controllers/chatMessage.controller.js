const ChatMessage = require("../models/chatMessage.model");
const moment = require("moment");

const addMessage = async (req, res) => {
  console.log("Invoked addMessage");
};
module.exports = {
  getChatRoomByRoomID,
  getChatRoomDetail,
  getAllMessageInRoom,
};
