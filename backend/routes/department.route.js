const express = require("express");
const router = express.Router();
const departmentControllers = require("../controllers/department.controller");

// Router-level middleware
router.param("departmentID", departmentControllers.getDepartmentById);
// router.get("/employee/:employeeId", employeeControllers.getOneEmployee);
router.get("/department", departmentControllers.getAllDepartment);
router.post("/department/create", departmentControllers.createDepartment);
// router.post("/employee/createmultipleemployee", employeeControllers.createMultipleEmployee);
router.put("/department/:departmentID/put", departmentControllers.putDepartment);
router.delete("/department/:departmentID/delete", departmentControllers.deleteDepartment);
router.patch("/department/deleteall", departmentControllers.deleteAllDepartment);

module.exports = router;