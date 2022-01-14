const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const companyControllers = require("../controllers/company.controller");

// Router-level middleware
router.get("/get", authJwt.verifyToken, companyControllers.getCompany);
router.post("/create", authJwt.verifyToken, companyControllers.createCompany);
router.delete(
  "/delete",
  authJwt.verifyToken,
  companyControllers.deleteCompany
);
router.put(
  "/update",
  authJwt.verifyToken,
  companyControllers.updateCompany
);

module.exports = router;
