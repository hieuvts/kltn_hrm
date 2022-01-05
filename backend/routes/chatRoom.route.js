const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const chatRoomController = require("../controllers/chatRoom.controller");

router.get("/getAll", chatRoomController.getAllChatRoom);
router.post("/createChatRoom", chatRoomController.createChatRoom);
router.param("chatRoomId", chatRoomController.getChatRoomByRoomID);
router.get("/:chatRoomId", chatRoomController.getChatRoomDetail);
router.get("/:chatRoomId/getMsg", chatRoomController.getAllMessageInRoom);
router.put("/:chatRoomId/addMsg", chatRoomController.addMessageToRoom);

module.exports = router;
