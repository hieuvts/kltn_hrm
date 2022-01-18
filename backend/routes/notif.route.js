const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const notifController = require("../controllers/notif.controller");

// Router-level middleware
router.get("/get", notifController.getNotif);
router.put("/update", notifController.markNotifAsRead);
router.delete("/delete", notifController.deleteNotif);
router.delete("/deleteAll", notifController.deleteAllNotif);

module.exports = router;
