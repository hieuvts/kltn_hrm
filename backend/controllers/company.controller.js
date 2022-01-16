const db = require("../models");
const Company = db.Company;
const moment = require("moment");

const getCompany = async (req, res) => {
  Company.findAll()
    .then((companies) => {
      if (companies) {
        res.status(200).json(companies);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllcompany");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllcompany");
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllcompany", error);
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createCompany = async (req, res) => {
  const dataToInsert = {
    name: req.body.name,
    typeOfCompany: req.body.typeOfCompany,
    mainBusinessLines: req.body.mainBusinessLines,
    establishedDate: req.body.establishedDate,
    address: req.body.address,
    address2: req.body.address2 || "Not available",
    phoneNumber: req.body.phoneNumber,
    fax: req.body.fax || "Not available",
    email: req.body.email,
    website: req.body.website || "Not available",
    taxCode: req.body.taxCode,
  };
  Company.create(dataToInsert)
    .then((company) => {
      res.status(200).json({
        message: "Create company successfully!",
        company: company,
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createCompany");
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllCompany");
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const updateCompany = async (req, res) => {
  Company.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateCompany");
        res.status(200).json({
          message: "Update company successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] updateCompany");
        return res.status(400).json({
          message: "Can't update company",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updateCompany");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteCompany = async (req, res) => {
  console.log("==> ", req.query.id);
  Company.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteCompany");
        res.status(200).json({
          message: "Delete company successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteCompany");
        return res.status(400).json({
          message: "Can't delete company",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteCompany");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllCompany = async (req, res) => {
  Company.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteCompany rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all company successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteCompany");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
  deleteAllCompany,
};
