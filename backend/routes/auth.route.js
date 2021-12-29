const express = require("express");
const router = express.Router();
const verifySignUp = require("../middlewares/verifySignUp");
const authController = require("../controllers/auth.controller");

router.post(
  "/signup",
  [
    verifySignUp.checkExistedEmail,
    verifySignUp.checkRolesIsExisted,
  ],
  authController.signUp
);

router.post("/login", authController.login);

module.exports = router;
