const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const employeeKpiClustersControllers = require("../controllers/employeeKpiCluster.controller");

// Router-level middleware
router.put('/getCSV', employeeKpiClustersControllers.getEmployeeKpiClusterFromCSV)
router.get("/get", employeeKpiClustersControllers.getEmployeeKpiCluster);
router.post(
  "/create",
  employeeKpiClustersControllers.createEmployeeKpiCluster
);

router.post(
  '/importCSV',
  employeeKpiClustersControllers.importDataFromCSV
);

router.delete(
  "/delete",
  employeeKpiClustersControllers.deleteEmployeeKpiCluster
);
router.delete(
  "/deleteall",
  employeeKpiClustersControllers.deleteAllEmployeeKpiCluster
);

module.exports = router;
