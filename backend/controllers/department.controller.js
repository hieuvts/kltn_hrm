const db = require("../models");
const Department = db.Department;
const moment = require("moment");

const getDepartment = async (req, res) => {
  Department.findAll()
    .then((departments) => {
      if (departments) {
        res.status(200).json(departments);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAlldepartment");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAlldepartment");
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getAllDepartment",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createDepartment = async (req, res) => {
  const dataToInsert = {
    name: req.body.name,
    manager: req.body.manager,
    companyID: req.body.companyID,
  };
  Department.create(dataToInsert)
    .then((department) => {
      res.status(200).json({
        message: "Create departments successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createDepartment");
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllDepartment");
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const updateDepartment = async (req, res) => {
  console.log("invoked update");
  Department.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateDepartment");
        res.status(200).json({
          message: "Update department successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] updateDepartment");
        return res.status(400).json({
          message: "Can't update department",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updateDepartment");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteDepartment = async (req, res) => {
  console.log("==> ", req.query.id);
  Department.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteDepartment");
        res.status(200).json({
          message: "Delete department successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteDepartment");
        return res.status(400).json({
          message: "Can't delete department",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteDepartment");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllDepartment = async (req, res) => {
  Department.destroy({ where: { _id: req.params.id }, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteDepartment rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all department successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteDepartment");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  deleteAllDepartment,
};
