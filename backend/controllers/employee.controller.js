const Employee = require("../models/employee.model");
const moment = require("moment");
const getEmployeeById = async (req, res, next, employeeId) => {
  // Get employee details from Employee model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  Employee.findById(employeeId).exec((error, result) => {
    if (error || !result) {
      console.log(`Employee ${employeeId} is not found`);
      res.status(404).json({
        message: "[ERROR] [Controller] Employee not found!",
      });
      return;
    } else {
      console.log(moment().format("hh:mm:ss"), `Employee ${employeeId} found!`);
    }
    req.employee = result;
    next();
  });
};

const getOneEmployee = async (req, res) => {
  // Take req.employee value from previous function "getEmployeeById"
  if (!req.employee) {
    res.status(400).json({
      message: "[ERROR] Employee not found!",
    });
    console.log(moment().format("hh:mm:ss"), "[SUCCESS] getOneEmployee");
  } else {
    res.status(200).json({
      employee: req.employee,
    });
    console.log(moment().format("hh:mm:ss"), "[ERROR] getOneEmployee");
  }
};

const getAllEmployee = async (req, res) => {
  const employees = await Employee.find();
  if (employees) {
    res.status(200).json({
      employees,
    });
    console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllEmployee");
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
    console.log(moment().format("hh:mm:ss"), "[ERROR] getAllEmployee");
  }
};

const createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  employee.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "Can't create new employee",
        errMsg: error.message,
      });
      console.log(moment().format("hh:mm:ss"), "[ERROR] createEmployee", error);
    } else {
      res.status(200).json({
        message: "Create employee successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createEmployee");
    }
  });
};

const updateEmployee = async (req, res) => {
  const employee = req.employee;
  // typeof req.body.name === "undefined"
  //   ? (employee.name = employee.name)
  //   : (employee.name = req.body.name);
  typeof req.body.name !== "undefined" && (employee.name = req.body.name);
  typeof req.body.gender !== "undefined" && (employee.gender = req.body.gender);
  typeof req.body.dateOfBirth !== "undefined" &&
    (employee.dateOfBirth = req.body.dateOfBirth);
  typeof req.body.phoneNumber !== "undefined" &&
    (employee.phoneNumber = req.body.phoneNumber);
  typeof req.body.email !== "undefined" && (employee.email = req.body.email);
  typeof req.body.address !== "undefined" &&
    (employee.address = req.body.address);
  typeof req.body.roleID !== "undefined" && (employee.roleID = req.body.roleID);
  typeof req.body.isDeleted !== "undefined" &&
    (employee.isDeleted = req.body.isDeleted);

  employee.save((error, result) => {
    if (error || !result) {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updateEmployee");
      return res.status(400).json({
        message: "Update user not successfully",
        error: error,
      });
    } else {
      res.status(200).json({
        employee,
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateEmployee");
    }
  });
};

// findOneAndDelete() returns the deleted document after having deleted it
// (in case you need its contents after the delete operation);
// deleteOne() is used to delete a single document
// remove() is a deprecated function and has been replaced by deleteOne()
// (to delete a single document) and deleteMany() (to delete multiple documents)
// findOneAndDelete() should be able to delete on _id.

const deleteEmployee = async (req, res) => {
  // Take req.employee value from previous function "getEmployeeById"
  const employee = req.employee;

  // result= `1` if MongoDB deleted a doc,
  // `0` if no docs matched the filter `{ name: ... }`
  Employee.deleteOne({ _id: employee._id }, (error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "Delete employee not successful",
        error: error,
      });
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteEmployee");
    } else {
      res.status(200).json({
        message: "Delete employee successfully!",
        result: result,
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteEmployee");
    }
  });
};

const deleteAllEmployee = async (req, res) => {
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  Employee.deleteMany((error, result) => {
    if (error || !result) {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteAllEmployee");
      return res.status(400).json({
        message: "Delete all employee not successful",
        error: error,
      });
    } else {
      res.status(200).json({
        message: "Delete all employee successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteAllEmployee");
    }
  });
};

module.exports = {
  getAllEmployee,
  getEmployeeById,
  getOneEmployee,
  createEmployee,
  deleteEmployee,
  deleteAllEmployee,
  updateEmployee,
};
