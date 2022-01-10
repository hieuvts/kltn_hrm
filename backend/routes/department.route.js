const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const departmentControllers = require("../controllers/department.controller");

// Router-level middleware
router.get(
  "/getAll",
  authJwt.verifyToken,
  departmentControllers.getAllDepartment
);
router.param(
  "departmentId",
  departmentControllers.getDepartmentById
);
// router.get("/department/:departmentId", departmentControllers.getOnedepartment);
router.post(
  "/create",
  authJwt.verifyToken,
  departmentControllers.createDepartment
);
router.delete(
  "/:departmentId/delete",
  authJwt.verifyToken,
  departmentControllers.deleteDepartment
);
router.delete(
  "/deleteall",
  authJwt.verifyToken,
  departmentControllers.deleteAllDepartment
);
router.put(
  "/:departmentId/update",
  authJwt.verifyToken,
  departmentControllers.putDepartment
);
// router.post("/department/createmultipledepartment", departmentControllers.createMultipledepartment);

module.exports = router;
