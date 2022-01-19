const db = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const ChatRoom = db.ChatRoom;
const ChatMessage = db.ChatMessage;
const ChatRoomDetails = db.ChatRoomDetails;
const AuthAccount = db.AuthAccount;
const moment = require("moment");

// get departmens of selected company
const getAllChatRoom = async (req, res) => {
  const searchQuery = req.query.search;
  ChatRoom.findAll({
    include: [AuthAccount, ChatMessage],
  })
    .then((chatRooms) => {
      if (chatRooms) {
        res.status(200).json(chatRooms);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllChatRoom");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllChatRoom");
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllChatRoom", error);
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createChatRoom = async (req, res) => {
  const chatRoom = await ChatRoom.create({ name: req.body.name });

  const thisMemberID = req.body.thisMemberID;
  const thatMemberID = req.body.thatMemberID;

  const cdt1 = await ChatRoomDetails.create({
    memberID: thisMemberID,
    chatRoomID: chatRoom.id,
  });
  const cdt2 = await ChatRoomDetails.create({
    memberID: thatMemberID,
    chatRoomID: chatRoom.id,
  });
  if (cdt2.memberID) {
    return res.status(200).json({
      message: "Create chat room successfully",
    });
  }
};

const updateChatRoom = async (req, res) => {
  console.log("invoked update", req.body);
  ChatRoom.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateChatRoom");
        res.status(200).json({
          message: "Update ChatRoom successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] updateChatRoom");
        return res.status(400).json({
          message: "Can't update ChatRoom",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updateChatRoom");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteChatRoom = async (req, res) => {
  console.log("==> ", req.query.id);
  ChatRoom.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteChatRoom");
        res.status(200).json({
          message: "Delete ChatRoom successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteChatRoom");
        return res.status(400).json({
          message: "Can't delete ChatRoom",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteChatRoom");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllChatRoom = async (req, res) => {
  ChatRoom.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteChatRoom rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all ChatRoom successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteChatRoom");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getAllChatRoom,
  createChatRoom,
  deleteChatRoom,
  updateChatRoom,
  deleteAllChatRoom,
};
