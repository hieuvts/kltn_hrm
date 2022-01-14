const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const chatRoomController = require("../controllers/chatRoom.controller");

router.get("/get", chatRoomController.getAllChatRooms);
router.get("/getChatRoomByAccID", chatRoomController.getChatRoomByAuthAccount);
router.post("/create", chatRoomController.createChatRoom);
router.get("/getMsgInRoomID", chatRoomController.getAllMessageInRoomID);
router.put("/addMsg", chatRoomController.addMessageToRoom);

module.exports = router;
