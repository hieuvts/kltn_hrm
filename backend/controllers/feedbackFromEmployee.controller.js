const FeedbackFromEmployee = require("../models/FeedbackFromEmployee.model");

// GET BY ID
const getFeedbackFromEmployeeById = async (req, res, next, FeedbackFromEmployeeId) => {
  // Get FeedbackFromEmployee details from FeedbackFromEmployee model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getFeedbackFromEmployeeByID");
  FeedbackFromEmployee.findById(FeedbackFromEmployeeId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] FeedbackFromEmployee not found!",
      });
    } else {
      console.log("[ERROR] [get] Failed!");
    }
    req.FeedbackFromEmployee = result;
    next();
  });
};

// GET ALL
const getAllFeedbackFromEmployee = async (req, res) => {
  const FeedbackFromEmployees = await FeedbackFromEmployee.find();
  if (FeedbackFromEmployees) {
    res.status(200).json({
      message: "Get all FeedbackFromEmployee successfully!",
      FeedbackFromEmployees: FeedbackFromEmployees,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

// Create FeedbackFromEmployee
const createFeedbackFromEmployee = async (req, res) => {
  console.log("Invoked create FeedbackFromEmployee");
  const FeedbackFromEmployee = new FeedbackFromEmployee(req.body);
  FeedbackFromEmployee.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "[ERROR] [post] ",
        errMsg: error.message,
      });
    } else {
      res.json({
        message: "Create FeedbackFromEmployee successfully!",
      });
    }
  });
};

// Update FeedbackFromEmployee
const putFeedbackFromEmployee = async (req, res) => {
  const FeedbackFromEmployee = req.FeedbackFromEmployee;
  // typeof req.body.name === "undefined"
  //   ? (FeedbackFromEmployee.name = FeedbackFromEmployee.name)
  //   : (FeedbackFromEmployee.name = req.body.name);
  typeof req.body.title !== "undefined" && (FeedbackFromEmployee.name = req.body.title);
  typeof req.body.content !== "undefined" && (FeedbackFromEmployee.content = req.body.content);
  typeof req.body.dateOfBirth !== "undefined" &&
    (FeedbackFromEmployee.employeeID = req.body.employeeID);
  typeof req.body.isDeleted !== "undefined" &&
    (FeedbackFromEmployee.isDeleted = req.body.isDeleted);

  FeedbackFromEmployee.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update FeedbackFromEmployee successfully",
      FeedbackFromEmployee: FeedbackFromEmployee,
    });
  });
};

// Delete one FeedbackFromEmployee
const deleteFeedbackFromEmployee = async (req, res ) => {
  const FeedbackFromEmployee = req.FeedbackFromEmployee;

  FeedbackFromEmployee.deleteOne({ _id: FeedbackFromEmployee._id }, (error, result) => {
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
}


// Delete all FeedbackFromEmployee 
const deleteAllFeedbackFromEmployee = async (req, res) => {
  console.log("Invoked deleteAllFeedbackFromEmployee");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  FeedbackFromEmployee.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all FeedbackFromEmployee successfully!",
    });
  });
};

module.exports = {
  getFeedbackFromEmployeeById,
  getAllFeedbackFromEmployee,
  createFeedbackFromEmployee,
  putFeedbackFromEmployee,
  deleteAllFeedbackFromEmployee,
  deleteFeedbackFromEmployee
};
