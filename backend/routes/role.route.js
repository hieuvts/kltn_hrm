const express = require("express");
const router = express.Router();
const roleControllers = require("../controllers/role.controller");

// Router-level middleware
router.param("roleId", roleControllers.getroleById);
// router.get("/role/:roleId", roleControllers.getOnerole);
router.get("/getAll", roleControllers.getAllrole);
router.post("/create", roleControllers.createrole);
router.delete("/:roleId/delete", roleControllers.deleterole);
router.patch("/deleteall", roleControllers.deleteAllrole);
router.put("/:roleId/put", roleControllers.putrole);
// router.post("/role/createmultiplerole", roleControllers.createMultiplerole);

module.exports = router;
