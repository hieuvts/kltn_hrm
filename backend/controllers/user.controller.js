require("dotenv").config({ path: "./config/.env" });
const Role = require("../models/role.model");
const User = require("../models/user.model");

const getUserById = async (req, res, next, userId) => {
  console.log("invoked getUserById");
  User.findById(userId)
    .populate("roles")
    .populate("employee")
    .exec((error, result) => {
      if (error || !result) {
        console.log(`user ${userId} is not found`);
        res.status(404).json({
          message: "[ERROR] [Controller] user not found!",
        });
        return;
      } else {
        console.log(`user ${userId} found!`);
      }
      req.user = result;
      next();
    });
};

const getUser = async (req, res) => {
  console.log("invoked getUser");

  // Take req.employee value from previous function "getEmployeeById"
  if (!req.user) {
    res.status(400).json({
      message: "[ERROR] User not found!",
    });
    console.log("[SUCCESS] getOneUser");
  } else {
    res.status(200).json({
      user: req.user,
    });
    console.log("[ERROR] getOneUser");
  }
};

const getAllUser = async (req, res) => {
  console.log("invoked getAllUser");

  let query = req.query.search;
  let users = {};

  if (typeof query === "undefined" || query.length === 0) {
    console.log("Return all users");
    users = await User.find().populate("roles").populate("employee");
  } else {
    console.log("Return users with search= ", query);
    users = await User.find({
      $text: {
        $search: `"${query}"`,
        // $search: `.*(\b${query}\b).*`,
      },
    })
      .populate("roles")
      .populate("employee");
  }

  if (users) {
    res.status(200).json({ users });
    console.log("[SUCCESS] getAlluser");
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
    console.log("[ERROR] getAlluser");
  }
};

const publicAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userRole = (req, res) => {
  res.status(200).send("User Content.");
};

const adminRole = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorRole = (req, res) => {
  res.status(200).send("Moderator Content.");
};

module.exports = {
  getUserById,
  getUser,
  getAllUser,
  publicAccess,
  userRole,
  adminRole,
  moderatorRole,
};
