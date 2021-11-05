const express = require("express");
const router = express.Router();
const departmentControllers = require("../controllers/department.controller");

// Router-level middleware
router.param("departmentID", departmentControllers.getDepartmentById);
// router.get("/employee/:employeeId", employeeControllers.getOneEmployee);
router.get("/department", departmentControllers.getAllDepartment);
router.post("/department/create", departmentControllers.createDepartment);
// router.post("/employee/createmultipleemployee", employeeControllers.createMultipleEmployee);
// router.put("/employee/:employeeId/put", employeeControllers.putemployee);
// router.delete("/employee/:employeeId/delete", employeeControllers.deletEemployee);
// router.patch("/employee/deleteall", employeeControllers.deleteMultiplEemployee);

module.exports = router;