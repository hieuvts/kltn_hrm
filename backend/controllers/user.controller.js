const user = require("../models/user.model");

const getuserById = async (req, res, next, userId) => {
  // Get user details from user model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getuserByID");
  user.findById(userId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] user not found!",
      });
      return;
    } else {
      console.log("user found!");
    }
    req.user = result;
    next();
  });
};

const getOneuser = async (req, res) => {
  console.log("Trigger getOneuser");
  // Take req.user value from previous function "getuserById"
  if (!req.user) {
    res.status(400).json({
      message: "[ERROR] user not found!",
    });
  } else {
    res.status(200).json({
      user: req.user,
    });
  }
};

const getAlluser = async (req, res) => {
  console.log("Trigger getAlluser");
  const users = await user.find();
  if (users) {
    res.status(200).json({
      message: "Get all user successfully!",
      users: users,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

const createuser = async (req, res) => {
  console.log("Invoked createuser");
  const user = new user(req.body);
  user.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "[ERROR] [create]",
        errMsg: error.message,
      });
    } else {
      res.status(200).json({
        message: "Create user successfully!",
      });
    }
  });
};

const putuser = async (req, res) => {
  const user = req.user;
  // typeof req.body.name === "undefined"
  //   ? (user.name = user.name)
  //   : (user.name = req.body.name);
  typeof req.body.username !== "undefined" && (user.username = req.body.username);
  typeof req.body.password !== "undefined" && (user.password = req.body.password);
  typeof req.body.employeeID !== "undefined" &&
    (user.employeeID = req.body.employeeID);
  typeof req.body.levelAccses !== "undefined" &&
    (user.levelAccses = req.body.levelAccses);
  typeof req.body.isDeleted !== "undefined" &&
    (user.isDeleted = req.body.isDeleted);

  user.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update user successfully",
      user: user,
    });
  });
};

// findOneAndDelete() returns the deleted document after having deleted it
// (in case you need its contents after the delete operation);
// deleteOne() is used to delete a single document
// remove() is a deprecated function and has been replaced by deleteOne()
// (to delete a single document) and deleteMany() (to delete multiple documents)
// findOneAndDelete() should be able to delete on _id.

const deleteuser = async (req, res) => {
  // console.log("Invoked deleteuser");
  // Take req.user value from previous function "getuserById"
  const user = req.user;
  // user.remove((error, result) => {
  //   if (error || !result) {
  //     res
  //       .status(400)
  //       .json({ message: "[ERROR] [delete] Something went wrong" });
  //   } else {
  //     res.status(200).json({
  //       message: "Delete user successfully!",
  //       deleteduser: user,
  //     });
  //   }
  // });

  // result= `1` if MongoDB deleted a doc,
  // `0` if no docs matched the filter `{ name: ... }`
  user.deleteOne({ _id: user._id }, (error, result) => {
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

const deleteAlluser = async (req, res) => {
  console.log("Invoked deleteAlluser");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  user.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all user successfully!",
    });
  });
};

module.exports = {
  getuserById,
  getAlluser,
  createuser,
  deleteuser,
  deleteAlluser,
  putuser,
};
