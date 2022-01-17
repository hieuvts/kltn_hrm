const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const companyControllers = require("../controllers/company.controller");

// Router-level middleware
router.get("/get", companyControllers.getCompany);
router.post("/create", companyControllers.createCompany);
router.delete("/delete", companyControllers.deleteCompany);
router.put("/update", companyControllers.updateCompany);

module.exports = router;
