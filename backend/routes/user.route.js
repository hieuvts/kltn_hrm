const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const userControllers = require("../controllers/user.controller");

router.get("/getAll", userControllers.getAllUser);
router.param("employeeId", userControllers.getUserById);
router.get("/:employeeId", userControllers.getUser);

// router.get("/test/all", userControllers.publicAccess);
// router.get("/test/user", [authJwt.verifyToken], userControllers.userRole);
// router.get(
//   "/test/mod",
//   [authJwt.verifyToken, authJwt.isModerator],
//   userControllers.moderatorRole
// );
// router.get(
//   "/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   userControllers.adminRole
// );
// router.put("/update", [authJwt.verifyToken, authJwt.isAdmin]);
module.exports = router;
