const db = require("../models");
const ChatMessage = db.ChatMessage;
const moment = require("moment");

const addMessage = async (req, res) => {
  ChatMessage.create(req.body)
    .then((message) => {
      if (message) {
        return res.status(200).json({
          message: "add msg ok",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] addMsg");
      return res.status(500).json({
        error: error,
      });
    });
};
module.exports = {
  addMessage,
};
