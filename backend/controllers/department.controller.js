const db = require("../models");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const Department = db.Department;
const Employee = db.Employee;
const moment = require("moment");

// get departmens of selected company
const getAllDepartment = async (req, res) => {
  const companyID = req.query.companyID || 1;
  Department.findAll({
    where: {
      companyID: companyID,
      [Op.or]: [{ name: { [Op.like]: `%${searchQuery}%` } }],
    },
  })
    .then((departments) => {
      if (departments) {
        res.status(200).json(departments);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllDepartment");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllDepartment");
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

const getAllDeptAndEmp = async (req, res) => {
  const searchQuery = req.query.search;
  Department.findAll({
    where: {
      [Op.or]: [{ name: { [Op.like]: `%${searchQuery}%` } }],
    },
    include: [Employee],
  })
    .then((departments) => {
      if (departments) {
        res.status(200).json(departments);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllDeptAndEmp");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAllDeptAndEmp] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllDeptAndEmp");
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getAllDeptAndEmp",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getAllDeptAndEmp] Something went wrong",
        error: error,
      });
    });
};

const getDeptAndEmpByID = async (req, res) => {
  if (typeof req.query.id === "undefined" || req.query.id.length === 0) {
    return res.status(404).json({
      message: "Department ID is not provided!",
    });
  }
  Department.findAll({
    where: { id: req.query.id },
    include: [Employee],
  })
    .then((departments) => {
      if (departments && departments.length !== 0) {
        res.status(200).json(departments);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getOneDeptAndEmp");
      } else {
        res.status(400).json({
          message: "[ERROR] [getOneDeptAndEmp] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getOneDeptAndEmp");
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getOneDeptAndEmp",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getOneDeptAndEmp] Something went wrong",
        error: error,
      });
    });
};

const createDepartment = async (req, res) => {
  const dataToInsert = {
    name: req.body.name,
    manager: req.body.managerID | "HR Admin",
    companyID: req.body.companyID || 1,
  };
  Department.create(dataToInsert)
    .then((department) => {
      res.status(200).json({
        message: "Create departments successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createDepartment");
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] createDepartment ",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const updateDepartment = async (req, res) => {
  console.log("invoked update", req.body);
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
  Department.destroy({ where: {}, truncate: false })
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
  getAllDepartment,
  getAllDeptAndEmp,
  getDeptAndEmpByID,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  deleteAllDepartment,
};
