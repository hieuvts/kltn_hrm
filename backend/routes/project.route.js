const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const verifySignUp = require("../middlewares/verifySignUp");
const projectControllers = require("../controllers/project.controller");

// Router-level middleware
router.get("/get", projectControllers.getProject);
router.post("/create", projectControllers.createProject);
router.put("/update", projectControllers.updateProject);
router.delete("/delete", projectControllers.deleteProject);
router.delete("/deleteall", projectControllers.deleteAllProject);

module.exports = router;
