const express = require("express");
const router = express.Router();
const task = require("../controllers/task.controller");

// Router-level middleware
router.param("task",task.gettaskById);
// router.get("/task/:task",task.getOnetask);
router.get("/getAll",task.getAlltask);
router.post("/create",task.createtask);
router.delete("/:task/delete",task.deletetask);
router.patch("/deleteall",task.deleteAlltask);
router.put("/:task/put",task.puttask);
// router.post("/task/createmultipletask",task.createMultipletask);

module.exports = router;
