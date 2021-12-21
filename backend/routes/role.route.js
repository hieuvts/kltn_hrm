const express = require("express");
const router = express.Router();
const roleControllers = require("../controllers/role.controller");

// Router-level middleware
router.param("roleId", roleControllers.getRoleById);
// router.get("/role/:roleId", roleControllers.getOnerole);
router.get("/getAll", roleControllers.getAllRole);
router.post("/create", roleControllers.createRole);
router.delete("/:roleId/delete", roleControllers.deleteRole);
router.patch("/deleteall", roleControllers.deleteAllRole);
router.put("/:roleId/put", roleControllers.putRole);
// router.post("/role/createmultiplerole", roleControllers.createMultiplerole);

module.exports = router;
