const Department = require("../models/department.model");

const getDepartmentById = async (req, res, next, departmentId) => {
  // Get employee details from Employee model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getDepartmentByID");
  Department.findById(departmentId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] Department not found!",
      });
    } else {
      console.log("[ERROR] [get] Failed!");
    }
    req.department = result;
    next();
  });
};

const getAllDepartment = async (req, res) => {
  const departments = await Department.find();
  if (departments) {
    res.status(200).json({
      message: "Get all employee successfully!",
      departments: departments,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

const createDepartment = async (req, res) => {
  console.log("Invoked create Department");
  const department = new Department(req.body);
  department.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "[ERROR] [post] ",
        errMsg: error.message,
      });
    } else {
      res.json({
        message: "Create department successfully!",
      });
    }
  });
};

module.exports = {
  getDepartmentById,
  getAllDepartment,
  createDepartment,
};
