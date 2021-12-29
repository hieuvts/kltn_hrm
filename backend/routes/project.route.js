const express = require("express");
const router = express.Router();
const project = require("../controllers/project.controller");

// Router-level middleware
router.get("/getAll",project.getAllproject);
router.param("projectId",project.getprojectById);
// router.get("/project/:project",project.getOneproject);
router.post("/create",project.createproject);
router.delete("/:projectId/delete",project.deleteproject);
router.delete("/deleteall",project.deleteAllproject);
router.put("/:projectId/put",project.putproject);
// router.post("/project/createmultipleproject",project.createMultipleproject);

module.exports = router;
