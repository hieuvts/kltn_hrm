const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const authController = require("../controllers/auth.controller");
const employeeControllers = require("../controllers/employee.controller");

router.post(
  "/signup",
  [verifySignUp.checkExistedEmail, verifySignUp.checkRolesIsExisted],
  authController.signUp,
  employeeControllers.createEmployee
);

router.post("/login", authController.login);

module.exports = router;
