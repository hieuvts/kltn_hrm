const db = require("../models");
const ChatMessage = db.ChatMessage;
const moment = require("moment");

const addMessage = async (req, res) => {
  console.log("Invoked addMessage");
};
module.exports = {
  addMessage,
};
