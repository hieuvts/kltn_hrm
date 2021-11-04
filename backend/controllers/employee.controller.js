const Employee = require("../models/employee.model");

const getEmployeeById = async (req, res, next, employeeId) => {
  // Get employee details from Employee model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getEmployeeByID");
  Employee.findById(employeeId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] Employee not found!",
      });
    } else {
      console.log("[ERROR] [get] Failed!");
    }
    req.employee = result;
    next();
  });
};

const getAllEmployee = async (req, res) => {
  const employees = await Employee.find();
  if (employees) {
    res.status(200).json({
      message: "Get all employee successfully!",
      employees: employees,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

const createEmployee = async (req, res) => {
  console.log("Invoked createEmployee");
  const employee = new Employee(req.body);
  employee.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "[ERROR] [post] ",
        errMsg: error.message,
      });
    } else {
      res.json({
        message: "Create employee successfully!",
      });
    }
  });
};

module.exports = {
  getEmployeeById,
  getAllEmployee,
  createEmployee,
};
