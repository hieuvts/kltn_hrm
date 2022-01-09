const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const roleControllers = require("../controllers/role.controller");

// Router-level middleware
router.get("/getAll", authJwt.verifyToken, roleControllers.getAllRole);
router.param("roleId", roleControllers.getRoleById);
// router.get("/role/:roleId", roleControllers.getOnerole);
router.post("/create", authJwt.verifyToken, roleControllers.createRole);
router.delete(
  "/:roleId/delete",
  authJwt.verifyToken,
  roleControllers.deleteRole
);
router.delete("/deleteall", authJwt.verifyToken, roleControllers.deleteAllRole);
router.put("/:roleId/put", authJwt.verifyToken, roleControllers.putRole);
// router.post("/role/createmultiplerole", roleControllers.createMultiplerole);

module.exports = router;
