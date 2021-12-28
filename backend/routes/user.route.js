const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

// Router-level middleware
router.get("/getAll",user.getAlluser);
router.param("userId",user.getuserById);
router.get("/user/:user",user.getOneuser);
router.post("/create",user.createuser);
router.delete("/:userId/delete",user.deleteuser);
router.delete("/deleteall",user.deleteAlluser);
router.put("/:userId/put",user.putuser);
// router.post("/user/createmultipleuser",user.createMultipleuser);

module.exports = router;
