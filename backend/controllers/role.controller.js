const Role = require("../models/role.model");

// GET BY ID
const getRoleById = async (req, res, next, RoleId) => {
  // Get Role details from Role model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getRoleByID");
  Role.findById(RoleId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] Role not found!",
      });
    } else {
      console.log("[ERROR] [get] Failed!");
    }
    req.Role = result;
    next();
  });
};

// GET ALL
const getAllRole = async (req, res) => {
  let query = req.query.search;
  let roles = {};

  if (typeof query === "undefined" || query.length === 0) {
    console.log("Return all roles");
    roles = await Role.find();
  } else {
    console.log("Return roles with search= ", query);
    roles = await Role.find({
      $text: {
        $search: `"${query}"`,
        // $search: `.*(\b${query}\b).*`,
      },
    });
  }

  if (roles) {
    res.status(200).json({
      message: "Get all Role successfully!",
      roles: roles,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

// Create Role
const createRole = async (req, res) => {
  console.log("Invoked create Role");
  const Role = new Role(req.body);
  Role.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "[ERROR] [post] ",
        errMsg: error.message,
      });
    } else {
      res.json({
        message: "Create Role successfully!",
      });
    }
  });
};

// Update Role
const putRole = async (req, res) => {
  const Role = req.Role;
  // typeof req.body.name === "undefined"
  //   ? (Role.name = Role.name)
  //   : (Role.name = req.body.name);
  typeof req.body.name !== "undefined" && (Role.name = req.body.name);
  typeof req.body.roleLevel !== "undefined" &&
    (Role.headOfRole = req.body.roleLevel);
  typeof req.body.isDeleted !== "undefined" &&
    (Role.isDeleted = req.body.isDeleted);

  Role.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update Role successfully",
      Role: Role,
    });
  });
};

// Delete one Role
const deleteRole = async (req, res) => {
  const Role = req.Role;

  Role.deleteOne({ _id: Role._id }, (error, result) => {
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

// Delete all Role
const deleteAllRole = async (req, res) => {
  console.log("Invoked deleteAllRole");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  Role.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all Role successfully!",
    });
  });
};

module.exports = {
  getRoleById,
  getAllRole,
  createRole,
  putRole,
  deleteAllRole,
  deleteRole,
};
