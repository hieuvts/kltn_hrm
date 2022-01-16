const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const employeeAchievementControllers = require("../controllers/employeeAchievement.controller");

// Router-level middleware
router.get("/get", employeeAchievementControllers.getEmployeeAchievement);
router.post(
  "/create",
  employeeAchievementControllers.createEmployeeAchievement
);
router.put("/update", employeeAchievementControllers.updateEmployeeAchievement);
router.delete(
  "/delete",
  employeeAchievementControllers.deleteEmployeeAchievement
);
router.delete(
  "/deleteall",
  employeeAchievementControllers.deleteAllEmployeeAchievement
);

module.exports = router;
