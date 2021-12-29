const express = require("express");
const router = express.Router();
const companyControllers = require("../controllers/company.controller");

// Router-level middleware
router.get("/get", companyControllers.getCompany);
router.param("companyId", companyControllers.getcompanyById);
router.post("/create", companyControllers.createCompany);
router.delete("/:companyId/delete", companyControllers.deleteCompany);
router.put("/:companyId/put", companyControllers.updateCompany);

module.exports = router;
