const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const chatRoomController = require("../controllers/chatRoom.controller");

router.get("/get", chatRoomController.getAllChatRoom);
router.post("/create", chatRoomController.createChatRoom);

module.exports = router;
