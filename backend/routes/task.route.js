const express = require("express");
const router = express.Router();
const task = require("../controllers/task.controller");

// Router-level middleware
router.get("/getAll",task.getAlltask);
router.param("taskId",task.gettaskById);
router.get("/task/:task",task.getOnetask);
router.post("/create",task.createtask);
router.delete("/:taskId/delete",task.deletetask);
router.delete("/deleteall",task.deleteAlltask);
router.put("/:taskId/put",task.puttask);
// router.post("/task/createmultipletask",task.createMultipletask);

module.exports = router;
