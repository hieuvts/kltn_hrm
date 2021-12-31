const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const employeeControllers = require("../controllers/employee.controller");

// Router-level middleware
router.get("/getAll", employeeControllers.getAllEmployee);
router.param("employeeId", employeeControllers.getEmployeeById);
// router.get("/:employeeId", employeeControllers.getOneEmployee);
router.post("/create", employeeControllers.createEmployee);
router.delete("/:employeeId/delete", employeeControllers.deleteEmployee);
router.delete("/deleteall", employeeControllers.deleteAllEmployee);
router.put("/:employeeId/update", employeeControllers.updateEmployee);

module.exports = router;
