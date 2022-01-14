const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const departmentControllers = require("../controllers/department.controller");

// Router-level middleware
router.get("/get", departmentControllers.getAllDepartment);
router.get("/getDeptEmp", departmentControllers.getAllDeptAndEmp);
router.get("/getDeptEmpByID", departmentControllers.getDeptAndEmpByID);
router.post("/create", departmentControllers.createDepartment);
router.put("/update", departmentControllers.updateDepartment);
router.delete("/delete", departmentControllers.deleteDepartment);
router.delete("/deleteall", departmentControllers.deleteAllDepartment);

module.exports = router;
