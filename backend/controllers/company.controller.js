const Company = require("../models/company.model");
const moment = require("moment");
const getcompanyById = async (req, res, next, companyId) => {
  // Get company details from company model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  Company.findById(companyId).exec((error, result) => {
    if (error || !result) {
      console.log(`Company ${companyId} is not found`);
      res.status(404).json({
        message: "[ERROR] [Controller] Company not found!",
      });
      return;
    } else {
      console.log(moment().format("hh:mm:ss"), `Company ${companyId} found!`);
    }
    req.company = result;
    next();
  });
};

const getCompany = async (req, res) => {
  let company = await company.find();

  if (company) {
    res.status(200).json({ company });
    console.log(
      moment().format("hh:mm:ss"),
      "[SUCCESS] getAllcompany",
      company
    );
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
    console.log(moment().format("hh:mm:ss"), "[ERROR] getAllcompany");
  }
};

const createCompany = async (req, res) => {
  const company = new Company(req.body);
  company.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "Can't create new company",
        errMsg: error.message,
      });
      console.log(moment().format("hh:mm:ss"), "[ERROR] createcompany", error);
    } else {
      res.status(200).json({
        message: "Create company successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createcompany");
    }
  });
};

const updateCompany = async (req, res) => {
  const company = req.company;

  typeof req.body.name !== "undefined" && (company.name = req.body.name);

  typeof req.body.address !== "undefined" &&
    (company.address = req.body.address);

  typeof req.body.address1 !== "undefined" &&
    (company.address1 = req.body.address1);

  typeof req.body.phoneNumber !== "undefined" &&
    (company.phoneNumber = req.body.phoneNumber);

  typeof req.body.fax !== "undefined" && (company.fax = req.body.fax);

  typeof req.body.email !== "undefined" && (company.email = req.body.email);

  typeof req.body.website !== "undefined" &&
    (company.website = req.body.website);

  typeof req.body.tax !== "undefined" && (company.tax = req.body.tax);

  company.save((error, result) => {
    if (error || !result) {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updatecompany");
      return res.status(400).json({
        message: "Update employee not successfully",
        error: error,
      });
    } else {
      res.status(200).json({
        company,
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] updatecompany");
    }
  });
};

const deleteCompany = async (req, res) => {
  const company = req.company;

  company.deleteOne({ _id: company._id }, (error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "Delete company not successful",
        error: error,
      });
      console.log(moment().format("hh:mm:ss"), "[ERROR] deletecompany");
    } else {
      res.status(200).json({
        message: "Delete company successfully!",
        result: result,
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] deletecompany");
    }
  });
};

module.exports = {
  getcompanyById,
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
};
