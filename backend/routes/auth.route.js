const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const authController = require("../controllers/auth.controller");
// const employeeControllers = require("../controllers/employee.controller");
// const pairUserEmployee = require("../middlewares/pairUserEmployee");

router.post("/signup", verifySignUp.checkExistedEmail, authController.signUp);

router.post("/login", authController.login);
router.post("/changePwd", authJwt.verifyToken, authController.changePassword);
router.get("/getChatRooms", authController.getChatRooms);
router.delete("/delete", authController.deleteAuthAccount);

module.exports = router;
