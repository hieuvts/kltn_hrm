const Employee = require("../models/employee.model");
const Role = require("../models/role.model");
const Department = require("../models/department.model");
const User = require("../models/user.model");
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
  // Search by name, email, phoneNumber
  let query = req.query.search;
  let employees = {};

  if (typeof query === "undefined" || query.length === 0) {
    console.log("Return all employees");
    employees = await Employee.find().populate("departments").populate("roles");
  } else {
    console.log("Return employees with search= ", query);
    employees = await Employee.find({
      $text: {
        $search: `"${query}"`,
        // $search: `.*(\b${query}\b).*`,
      },
    })
      .populate("department")
      .populate("role");
  }

  if (employees) {
    res.status(200).json({ employees });
    console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllEmployee");
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
    console.log(moment().format("hh:mm:ss"), "[ERROR] getAllEmployee");
  }
};
const saveEmployeeHelper = (req, res, employee) => {
  console.log("helper: ", employee);
  if (req.body.roles) {
    Role.find(
      {
        name: { $in: req.body.roles },
      },
      (error, roles) => {
        if (error) {
          res.status(500).send({ message: error });
          return;
        }
        employee.roles = roles.map((role) => role._id);
        employee.save((error) => {
          if (error) {
            res.status(500).send({ message: error });
            return;
          }
          res.send({
            message: `Create employee with role=${employee.roles} successfully!`,
          });
        });
      }
    );
  } else {
    // If user not provide any role -> Assign them to "user" role
    Role.findOne({ name: "user" }, (error, role) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
      employee.roles = [role._id];
      employee.save((error) => {
        if (error) {
          res.status(500).send({ message: error });
          return;
        }
        res.send({
          message: `Create employee with role=${employee.roles} successfully!`,
        });
      });
    });
  }
};
const createEmployee = async (req, res) => {
  console.log("invoke createEmployee");
  const employee = new Employee(req.body);

  // If user provide a custom role (not Admin, Moderator, User)
  if (!req.body.departments) {
    console.log("not provide departments");
    saveEmployeeHelper(req, res, employee);
  } else if (req.body.departments) {
    console.log("had provided departments");
    Department.find(
      {
        name: { $in: req.body.departments },
      },
      (error, departments) => {
        if (error || !departments || departments.length === 0) {
          saveEmployeeHelper(req, res, employee);
        } else {
          employee.departments = departments.map(
            (department) => department._id
          );
          saveEmployeeHelper(req, res, employee);
        }
      }
    );
  }
};

const updateEmployee = async (req, res) => {
  console.log("invoked be updateEmployee");
  const employee = req.employee;

  typeof req.body.fname !== "undefined" && (employee.fname = req.body.fname);
  typeof req.body.lname !== "undefined" && (employee.lname = req.body.lname);
  typeof req.body.gender !== "undefined" && (employee.gender = req.body.gender);
  typeof req.body.dateOfBirth !== "undefined" &&
    (employee.dateOfBirth = req.body.dateOfBirth);
  typeof req.body.phoneNumber !== "undefined" &&
    (employee.phoneNumber = req.body.phoneNumber);
  typeof req.body.email !== "undefined" && (employee.email = req.body.email);
  typeof req.body.address !== "undefined" &&
    (employee.address = req.body.address);
  typeof req.body.roles !== "undefined" && (employee.roles = req.body.roles);
  typeof req.body.departments !== "undefined" &&
    (employee.departments = req.body.departments);
  typeof req.body.isDeleted !== "undefined" &&
    (employee.isDeleted = req.body.isDeleted);

  if (!req.body.departments) {
    console.log("not provide departments");
    saveEmployeeHelper(req, res, employee);
  } else if (req.body.departments) {
    console.log("had provided departments");
    Department.find(
      {
        name: { $in: req.body.departments },
      },
      (error, departments) => {
        if (error || !departments || departments.length === 0) {
          saveEmployeeHelper(req, res, employee);
        } else {
          employee.departments = departments.map(
            (department) => department._id
          );
          saveEmployeeHelper(req, res, employee);
        }
      }
    );
  }
  // employee.save((error, result) => {
  //   if (error || !result) {
  //     res.status(500).send(err);
  //     return;
  //   }
  //   if (req.body.roles) {
  //     Role.find(
  //       {
  //         name: { $in: req.body.roles },
  //       },
  //       (error, roles) => {
  //         if (error) {
  //           res.status(500).send({ message: error });
  //           return;
  //         }

  //         employee.roles = roles.map((role) => role._id);
  //         employee.save((error) => {
  //           if (error) {
  //             res.status(500).send({ message: error });
  //             return;
  //           }

  //           res.send({ message: "Update employee successfully!" });
  //         });
  //       }
  //     );
  //   } else {
  //     // If user not provide any role -> Assign them to "admin" role
  //     Role.findOne({ name: "user" }, (error, role) => {
  //       if (error) {
  //         res.status(500).send({ message: error });
  //         return;
  //       }

  //       employee.roles = [role._id];
  //       employee.save((error) => {
  //         if (error) {
  //           res.status(500).send({ message: error });
  //           return;
  //         }

  //         res.send({ message: "Create employee successfully!" });
  //       });
  //     });
  //   }
  // });
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
