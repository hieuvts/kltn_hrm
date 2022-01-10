const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const project = require("../controllers/project.controller");

// Router-level middleware
router.get("/getAll", authJwt.verifyToken, project.getAllproject);
router.param("projectId", project.getprojectById);
// router.get("/project/:project",project.getOneproject);
router.post("/create", authJwt.verifyToken, project.createproject);
router.delete("/:projectId/delete", authJwt.verifyToken, project.deleteproject);
router.delete("/deleteall", authJwt.verifyToken, project.deleteAllproject);
router.put("/:projectId/update", authJwt.verifyToken, project.putproject);
// router.post("/project/createmultipleproject",project.createMultipleproject);

module.exports = router;
