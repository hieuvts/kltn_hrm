const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const chatRoomController = require("../controllers/chatRoom.controller");

router.get("/getAll", authJwt.verifyToken, chatRoomController.getAllChatRoom);
router.post(
  "/createChatRoom",
  authJwt.verifyToken,
  chatRoomController.createChatRoom
);
router.param("chatRoomId", chatRoomController.getChatRoomByRoomID);
router.get(
  "/:chatRoomId",
  authJwt.verifyToken,
  chatRoomController.getChatRoomDetail
);
router.get(
  "/:chatRoomId/getMsg",
  authJwt.verifyToken,
  chatRoomController.getAllMessageInRoom
);
router.put(
  "/:chatRoomId/addMsg",
  authJwt.verifyToken,
  chatRoomController.addMessageToRoom
);

module.exports = router;
