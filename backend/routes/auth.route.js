const express = require("express");
const router = express.Router();
// const { authJwt } = require("../middlewares");
// const verifySignUp = require("../middlewares/verifySignUp");
const authController = require("../controllers/auth.controller");
// const employeeControllers = require("../controllers/employee.controller");
// const pairUserEmployee = require("../middlewares/pairUserEmployee");

router.post(
  "/signup",
  authController.signUp,
);

router.post("/login", authController.login);
// router.post(
//   "/changePwd",
//   authJwt.verifyToken,
//   authController.verifyOldPassword,
//   authController.changePassword
// );

module.exports = router;
