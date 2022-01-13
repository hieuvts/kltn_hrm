const db = require("../models");
const Employee = db.Employee;
const moment = require("moment");

const getEmployee = async (req, res) => {
  Employee.findAll()
    .then((employees) => {
      if (employees) {
        res.status(200).json(employees);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllemployee");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllemployee");
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllemployee", error);
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createEmployee = async (req, res) => {
  const dataToInsert = {
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    position: req.body.position || "New",
    departmentID: req.body.departmentID,
  };
  Employee.create(dataToInsert)
    .then((employee) => {
      res.status(200).json({
        message: "Create employees successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createEmployee");
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllEmployee");
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const updateEmployee = async (req, res) => {
  console.log("update values \n", req.body);
  Employee.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateEmployee");
        res.status(200).json({
          message: "Update employee successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] updateEmployee");
        return res.status(400).json({
          message: "Can't update employee",
        });
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] updateEmployee",
        error.message
      );
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteEmployee = async (req, res) => {
  console.log("==> ", req.query.id);
  Employee.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteEmployee");
        res.status(200).json({
          message: "Delete employee successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteEmployee");
        return res.status(400).json({
          message: "Can't delete employee",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteEmployee");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllEmployee = async (req, res) => {
  Employee.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteEmployee rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all employee successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteEmployee");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  deleteAllEmployee,
};
