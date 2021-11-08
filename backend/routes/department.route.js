const express = require("express");
const router = express.Router();
const departmentControllers = require("../controllers/department.controller");

// Router-level middleware
router.param("departmentId", departmentControllers.getdepartmentById);
// router.get("/department/:departmentId", departmentControllers.getOnedepartment);
router.get("/getAll", departmentControllers.getAlldepartment);
router.post("/create", departmentControllers.createdepartment);
router.delete("/:departmentId/delete", departmentControllers.deletedepartment);
router.patch("/deleteall", departmentControllers.deleteAlldepartment);
router.put("/:departmentId/put", departmentControllers.putdepartment);
// router.post("/department/createmultipledepartment", departmentControllers.createMultipledepartment);

module.exports = router;
