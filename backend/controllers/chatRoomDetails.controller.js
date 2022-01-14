const db = require("../models");
const ChatRoomDetails = db.ChatRoomDetails;
const moment = require("moment");

const getChatRoomDetails = async (req, res) => {
  ChatRoomDetails.findAll()
    .then((chatRoomDetails) => {
      if (chatRoomDetails) {
        res.status(200).json(chatRoomDetails);
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

const getQtyMemberInRoomID = async (req, res) => {
  console.log("getQtyMemberInRoomID roomID", req.query.id);
  ChatRoomDetails.findAndCountAll({
    where: { chatRoomID: req.query.id },
  })
    .then((chatRoomDetails) => {
      if (chatRoomDetails.count) {
        res.status(200).json(chatRoomDetails.count);
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] getQtyMemberInRoomID"
        );
      } else {
        res.status(400).json({
          message: "[ERROR] [getQtyMemberInRoomID] Something went wrong",
        });
        console.log(
          moment().format("hh:mm:ss"),
          "[ERROR] getQtyMemberInRoomID"
        );
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getQtyMemberInRoomID",
        error.message
      );
      res.status(500).json({
        message: "[ERROR] [getQtyMemberInRoomID] Something went wrong",
        error: error.message,
      });
    });
};

module.exports = {
  getChatRoomDetails,
  getQtyMemberInRoomID,
};
