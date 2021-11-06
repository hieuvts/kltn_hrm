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
      return;
    } else {
      console.log("Employee found!");
    }
    req.employee = result;
    next();
  });
};

const getOneEmployee = async (req, res) => {
  console.log("Trigger getOneEmployee");
  // Take req.employee value from previous function "getEmployeeById"
  if (!req.employee) {
    res.status(400).json({
      message: "[ERROR] Employee not found!",
    });
  } else {
    res.status(200).json({
      employee: req.employee,
    });
  }
};

const getAllEmployee = async (req, res) => {
  console.log("Trigger getAllEmployee");
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
        message: "[ERROR] [create]",
        errMsg: error.message,
      });
    } else {
      res.status(200).json({
        message: "Create employee successfully!",
      });
    }
  });
};

const putEmployee = async (req, res) => {
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
  typeof req.body.role !== "undefined" && (employee.role = req.body.role);
  typeof req.body.isDeleted !== "undefined" &&
    (employee.isDeleted = req.body.isDeleted);

  employee.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update user successfully",
      employee: employee,
    });
  });
};

// findOneAndDelete() returns the deleted document after having deleted it
// (in case you need its contents after the delete operation);
// deleteOne() is used to delete a single document
// remove() is a deprecated function and has been replaced by deleteOne()
// (to delete a single document) and deleteMany() (to delete multiple documents)
// findOneAndDelete() should be able to delete on _id.

const deleteEmployee = async (req, res) => {
  // console.log("Invoked deleteEmployee");
  // Take req.employee value from previous function "getEmployeeById"
  const employee = req.employee;
  // employee.remove((error, result) => {
  //   if (error || !result) {
  //     res
  //       .status(400)
  //       .json({ message: "[ERROR] [delete] Something went wrong" });
  //   } else {
  //     res.status(200).json({
  //       message: "Delete employee successfully!",
  //       deletedEmployee: employee,
  //     });
  //   }
  // });

  // result= `1` if MongoDB deleted a doc,
  // `0` if no docs matched the filter `{ name: ... }`
  Employee.deleteOne({ _id: employee._id }, (error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "Can't delete!!!",
        error: error,
      });
    } else {
      res.status(200).json({
        message: "Delete successfully!",
        result: result,
      });
    }
  });
};

const deleteAllEmployee = async (req, res) => {
  console.log("Invoked deleteAllEmployee");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  Employee.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all employee successfully!",
    });
  });
};

module.exports = {
  getEmployeeById,
  getAllEmployee,
  createEmployee,
  deleteEmployee,
  deleteAllEmployee,
  putEmployee,
};
