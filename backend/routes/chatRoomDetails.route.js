const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const chatRoomDetails = require("../controllers/chatRoomDetails.controller");

// Router-level middleware
router.get("/get", chatRoomDetails.getChatRoomDetails);

module.exports = router;
