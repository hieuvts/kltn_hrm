const Department = require("../models/department.model");

// GET BY ID
const getDepartmentById = async (req, res, next, departmentId) => {
  // Get Department details from Department model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getDepartmentByID");
  console.log(Department);
  Department.findById(departmentId).exec((error, result) => {
    if (error || !result) {
      console.log(`Department ${departmentId} is not found`);
      res.status(404).json({
        message: "[ERROR] [Controller] Department not found!",
      });
      return;
    } else {
      console.log(`Department ${departmentId} found!`);
    }
    req.department = result;
    next();
  });
};

// GET ALL
const getAllDepartment = async (req, res) => {
  let query = req.query.search;
  let departments = {};

  if (typeof query === "undefined" || query.length === 0) {
    console.log("Return all departments");
    departments = await Department.find();
  } else {
    console.log("Return departments with search= ", query);
    departments = await Department.find({
      $text: {
        $search: `"${query}"`,
        // $search: `.*(\b${query}\b).*`,
      },
    });
  }

  if (departments) {
    res.status(200).json({ departments });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

// Create Department
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

// Update Department
const putDepartment = async (req, res) => {
  const department = req.department;
  // typeof req.body.name === "undefined"
  //   ? (Department.name = Department.name)
  //   : (Department.name = req.body.name);
  typeof req.body.name !== "undefined" && (department.name = req.body.name);
  typeof req.body.manager !== "undefined" &&
    (department.manager = req.body.manager);
  typeof req.body.amount !== "undefined" &&
    (department.amount = req.body.amount);
  typeof req.body.isDeleted !== "undefined" &&
    (department.isDeleted = req.body.isDeleted);

    department.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update department successfully",
      Department: department,
    });
  });
};

// Delete one Department
const deleteDepartment = async (req, res) => {
  console.log(req);
  const department = req.department;
  Department.deleteOne({ _id: department._id }, (error, result) => {
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

// Delete all Department
const deleteAllDepartment = async (req, res) => {
  console.log("Invoked deleteAllDepartment");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  Department.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all department successfully!",
    });
  });
};

module.exports = {
  getDepartmentById,
  getAllDepartment,
  createDepartment,
  putDepartment,
  deleteAllDepartment,
  deleteDepartment,
};
