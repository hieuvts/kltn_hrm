const express = require("express");
const router = express.Router();
const departmentControllers = require("../controllers/department.controller");

// Router-level middleware
router.param("departmentId", departmentControllers.getDepartmentById);
// router.get("/department/:departmentId", departmentControllers.getOnedepartment);
router.get("/getAll", departmentControllers.getAllDepartment);
router.post("/create", departmentControllers.createDepartment);
router.delete("/:departmentId/delete", departmentControllers.deleteDepartment);
router.patch("/deleteall", departmentControllers.deleteAllDepartment);
router.put("/:departmentId/put", departmentControllers.putDepartment);
// router.post("/department/createmultipledepartment", departmentControllers.createMultipledepartment);

module.exports = router;
