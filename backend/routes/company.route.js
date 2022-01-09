const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const companyControllers = require("../controllers/company.controller");

// Router-level middleware
router.get("/get", authJwt.verifyToken, companyControllers.getCompany);
router.param("companyId", companyControllers.getcompanyById);
router.post("/create", authJwt.verifyToken, companyControllers.createCompany);
router.delete(
  "/:companyId/delete",
  authJwt.verifyToken,
  companyControllers.deleteCompany
);
router.put(
  "/:companyId/put",
  authJwt.verifyToken,
  companyControllers.updateCompany
);

module.exports = router;
