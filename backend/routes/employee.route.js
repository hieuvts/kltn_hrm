const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employee.controller");

// Router-level middleware
router.param("employeeId", employeeControllers.getEmployeeById);
// router.get("/employee/:employeeId", employeeControllers.getOneEmployee);
router.get("/getAll", employeeControllers.getAllEmployee);
router.post("/create", employeeControllers.createEmployee);
router.delete("/:employeeId/delete", employeeControllers.deleteEmployee);
router.patch("/deleteall", employeeControllers.deleteAllEmployee);
router.put("/:employeeId/put", employeeControllers.putEmployee);
// router.post("/employee/createmultipleemployee", employeeControllers.createMultipleEmployee);

module.exports = router;
