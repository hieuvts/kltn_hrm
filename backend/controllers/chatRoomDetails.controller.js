const db = require("../models");
const ChatRoomDetails = db.ChatRoomDetails;
const moment = require("moment");

const getChatRoomDetails = async (req, res) => {
  ChatRoomDetails.findAll()
    .then((departments) => {
      if (departments) {
        res.status(200).json(departments);
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] getChatRoomDetails"
        );
      } else {
        res.status(400).json({
          message: "[ERROR] [getChatRoomDetails] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getChatRoomDetails");
      }
      getChatRoomDetails;
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getChatRoomDetails",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getChatRoomDetails] Something went wrong",
        error: error,
      });
    });
};

module.exports = {
  getChatRoomDetails,
};
