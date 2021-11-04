const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employee.controller");

// Router-level middleware
router.param("employeeId", employeeControllers.getEmployeeById);
// router.get("/employee/:employeeId", employeeControllers.getOneEmployee);
router.get("/employee", employeeControllers.getAllEmployee);
router.post("/employee/create", employeeControllers.createEmployee);
// router.post("/employee/createmultipleemployee", employeeControllers.createMultipleEmployee);
// router.put("/employee/:employeeId/put", employeeControllers.putemployee);
// router.delete("/employee/:employeeId/delete", employeeControllers.deletEemployee);
// router.patch("/employee/deleteall", employeeControllers.deleteMultiplEemployee);

module.exports = router;