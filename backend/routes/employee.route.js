const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const employeeControllers = require("../controllers/employee.controller");

// Router-level middleware
router.get("/get", authJwt.verifyToken, employeeControllers.getEmployee);
router.post(
  "/create",
  authJwt.verifyToken,
  verifySignUp.checkExistedEmail,
  employeeControllers.createEmployee
);
router.put("/update", authJwt.verifyToken, employeeControllers.updateEmployee);
router.delete(
  "/delete",
  authJwt.verifyToken,
  employeeControllers.deleteEmployee
);
router.delete("/deleteall", employeeControllers.deleteAllEmployee);

module.exports = router;
