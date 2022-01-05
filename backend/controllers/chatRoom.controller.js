const ChatRoom = require("../models/chatRoom.model");
const User = require("../models/user.model");

const moment = require("moment");

// get Message
const getChatRoomByRoomID = async (req, res, next, chatRoomId) => {
  ChatRoom.findById(chatRoomId).exec((error, result) => {
    if (error || !result) {
      console.log(`Room ${chatRoomId} is not found`);
      res.status(404).json({
        message: "[ERROR] [Controller] Room not found!",
      });
      return;
    } else {
      console.log(moment().format("hh:mm:ss"), `Room ${chatRoomId} found!`);
    }
    req.chatRoom = result;
    next();
  });
};
const getChatRoomDetail = async (req, res) => {
  if (!req.chatRoom) {
    res.status(400).json({
      message: "[ERROR] [getChatRoomDetail] chatRoom not found!",
    });
    console.log(moment().format("hh:mm:ss"), "[SUCCESS] getChatRoomDetail");
  } else {
    res.status(200).json({
      chatRoom: req.chatRoom,
    });
    console.log(moment().format("hh:mm:ss"), "[ERROR] getChatRoomDetail");
  }
};
const addRoomIdToUser = async (req, res, chatRoomId) => {
  const members = req.body.members;
  const chatRooms = [];
  console.log("chatRoomId", chatRoomId);
  await members.map((member, index) => {
    console.log("current memberid", member);
    User.findOneAndUpdate(
      { _id: member },
      {
        $push: { chatRooms: chatRoomId },
      },
      (error, user) => {
        if (error) {
          res
            .status(500)
            .send({ message: "[ERROR] addRoomIdToUser " + index + error });
          return;
        }
        console.log("Patched");
      }
    );
  });
};
const createChatRoom = async (req, res) => {
  const newChatRoom = ChatRoom(req.body);

  console.log("creatChatRoom ", req.body);
  newChatRoom.save(async (error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "Can't create new chat room",
        errMsg: error.message,
      });
      console.log(moment().format("hh:mm:ss"), "[ERROR] createChatRoom", error);
    } else {
      await addRoomIdToUser(req, res, result._id);
      res.status(200).json({
        message: "createChatRoom successfully!",
        result: result,
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createnewChatRoom");
    }
  });
};
const getAllChatRoom = async (req, res) => {
  ChatRoom.find()
    .populate("members")
    .exec((error, chatrooms) => {
      if (chatrooms) {
        res.status(200).json({ chatrooms });
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllChatRoom");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAllMessageInRoom] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllChatRoom");
      }
    });
};

const getAllMessageInRoom = async (req, res) => {
  const chatRoom = req.chatRoom;
  const messages = chatRoom.messages;
  res.status(200).send({ messages: messages });
};

const addMessageToRoom = async (req, res) => {
  const message = new ChatMessage();
  // Get the correct chatRoom to push new message
  const chatRoom = req.chatRoom;
  chatRoom.messages.push(req.body);
  const updated = await chatRoom.save();
  if (!updated) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).send({ message: "Added new message to the database" });
};
module.exports = {
  getChatRoomByRoomID,
  createChatRoom,
  getAllChatRoom,
  getChatRoomDetail,
  getAllMessageInRoom,
  addMessageToRoom,
};
