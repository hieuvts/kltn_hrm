const express = require("express");
const router = express.Router();
const project = require("../controllers/project.controller");

// Router-level middleware
router.param("project",project.getprojectById);
// router.get("/project/:project",project.getOneproject);
router.get("/getAll",project.getAllproject);
router.post("/create",project.createproject);
router.delete("/:project/delete",project.deleteproject);
router.patch("/deleteall",project.deleteAllproject);
router.put("/:project/put",project.putproject);
// router.post("/project/createmultipleproject",project.createMultipleproject);

module.exports = router;
