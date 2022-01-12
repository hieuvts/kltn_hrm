const Task = require("../models/task.model");
const Employee = require("../models/employee.model");
const Project =  require("../models/project.model");
const gettaskById = async (req, res, next, taskId) => {
  // Get task details from task model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger gettaskByID");
  Task.findById(taskId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] task not found!",
      });
      return;
    } else {
      console.log("task found!");
    }
    req.task = result;
    next();
  });
};

const getOnetask = async (req, res) => {
  console.log("Trigger getOnetask");
  // Take req.task value from previous function "gettaskById"
  if (!req.task) {
    res.status(400).json({
      message: "[ERROR] task not found!",
    });
  } else {
    res.status(200).json({
      task: req.task,
    });
  }
};

const getAlltask = async (req, res) => {
  let query = req.query.search;
  let tasks = {};

  if (typeof query === "undefined" || query.length === 0) {
    console.log("Return all tasks");
    tasks = await Task.find().populate("assignFrom").populate("assignTo").populate("project");
  } else {
    console.log("Return tasks with search= ", query);
    tasks = await Task.find()
    .or([
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        assignFrom: {
          $regex: query,
          $options: "i",
        },
      },
      {
        assignTo: {
          $regex: query,
          $options: "i",
        },
      },
    ])
    .populate("assignFrom").populate("assignTo").populate("project");
    ;
  }
  if (tasks) {
    res.status(200).json({
      message: "Get all task successfully!",
      tasks: tasks,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

const createtask = async (req, res) => {
  console.log("Invoked createtask");
  const task = new Task(req.body);
  if (req.body.assignFrom || req.body.assignFrom.length !== 0) {
    task.assignFrom = await Employee.find({ _id: { $in: req.body.assignFrom[0]._id } });
  }
  if (req.body.assignTo || req.body.assignTo.length !== 0) {
    task.assignTo = await Employee.find({ _id: { $in: req.body.assignTo[0]._id } });
  }
  if (req.body.project || req.body.project.length !== 0) {
    task.project = await Project.find({ name: { $in: req.body.project } });
  }
  task.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update user successfully",
      task: task,
    });
  });
}

const puttask = async (req, res) => {
  const task = req.task;
  // typeof req.body.name === "undefined"
  //   ? (task.name = task.name)
  //   : (task.name = req.body.name);
  typeof req.body.name !== "undefined" && (task.name = req.body.name);
  typeof req.body.assignFrom !== "undefined" && (task.assignFrom = req.body.assignFrom);
  typeof req.body.assignTo !== "undefined" &&
    (task.assignTo = req.body.assignTo);
  typeof req.body.difficulty !== "undefined" &&
    (task.difficulty = req.body.difficulty);
  typeof req.body.procedureID !== "undefined" && (task.procedureID = req.body.procedureID);
  typeof req.body.isDeleted !== "undefined" &&
    (task.isDeleted = req.body.isDeleted);
  typeof req.body.priority !== "undefined" && (task.priority = req.body.priority);
  typeof req.body.deadline !== "undefined" && (task.deadline = req.body.deadline);
  typeof req.body.status !== "undefined" && (task.status = req.body.status);
  typeof req.body.progress !== "undefined" && (task.progress = req.body.progress);
  if ( req.body.assignFrom.length !== 0) {
    task.assignFrom = await Employee.find({ _id: { $in: req.body.assignFrom[0]._id } });
  }
  if (req.body.assignTo.length !== 0) {
    task.assignTo = await Employee.find({ _id: { $in: req.body.assignTo[0]._id } });
  }
  if (req.body.project.length !== 0) {
    task.project = await Project.find({ name: { $in: req.body.project } });
  }
  task.save((error, result) => {  
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update user successfully",
      task: task,
    });
  });
};

// findOneAndDelete() returns the deleted document after having deleted it
// (in case you need its contents after the delete operation);
// deleteOne() is used to delete a single document
// remove() is a deprecated function and has been replaced by deleteOne()
// (to delete a single document) and deleteMany() (to delete multiple documents)
// findOneAndDelete() should be able to delete on _id.

const deletetask = async (req, res) => {
  console.log("Invoked deletetask");
  // Take req.task value from previous function "gettaskById"
  const task = req.task;
  // task.remove((error, result) => {
  //   if (error || !result) {
  //     res
  //       .status(400)
  //       .json({ message: "[ERROR] [delete] Something went wrong" });
  //   } else {
  //     res.status(200).json({
  //       message: "Delete task successfully!",
  //       deletedtask: task,
  //     });
  //   }
  // });

  // result= `1` if MongoDB deleted a doc,
  // `0` if no docs matched the filter `{ name: ... }`
  Task.deleteOne({ _id: task._id }, (error, result) => {
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

const deleteAlltask = async (req, res) => {
  console.log("Invoked deleteAlltask");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  Task.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all task successfully!",
    });
  });
};

module.exports = {
  gettaskById,
  getAlltask,
  createtask,
  deletetask,
  deleteAlltask,
  puttask,
};
