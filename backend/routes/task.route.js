const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const taskControllers = require("../controllers/task.controller");

// Router-level middleware
router.get("/get", taskControllers.getTask);
router.post("/create", taskControllers.createTask);
router.put("/update", taskControllers.updateTask);
router.delete("/delete", taskControllers.deleteTask);
router.delete("/deleteall", taskControllers.deleteAllTask);

module.exports = router;
