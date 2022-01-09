const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const employeeControllers = require("../controllers/employee.controller");

// Router-level middleware
router.get("/getAll", authJwt.verifyToken, employeeControllers.getAllEmployee);
router.param("employeeId", employeeControllers.getEmployeeById);
router.get("/:employeeId", employeeControllers.getOneEmployee);
router.post(
  "/create",
  [verifySignUp.checkExistedEmail, verifySignUp.checkRolesIsExisted],
  employeeControllers.createEmployee
);
router.delete("/:employeeId/delete", employeeControllers.deleteEmployee);
router.delete("/deleteall", employeeControllers.deleteAllEmployee);
router.put(
  "/:employeeId/update",
  [verifySignUp.checkExistedEmail, verifySignUp.checkRolesIsExisted],
  employeeControllers.updateEmployee
);

module.exports = router;
