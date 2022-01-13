const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const employeeControllers = require("../controllers/employee.controller");

// Router-level middleware
router.get("/get", employeeControllers.getAllEmployee);
router.get("/getEmpDept", employeeControllers.getEmployeeAndDepartment);
router.post(
  "/create",
  verifySignUp.checkExistedEmail,
  employeeControllers.createEmployee
);
router.put("/update", employeeControllers.updateEmployee);
router.delete("/delete", employeeControllers.deleteEmployee);
router.delete(
  "/deleteall",
  authJwt.verifyToken,
  employeeControllers.deleteAllEmployee
);

module.exports = router;
