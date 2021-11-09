const Project = require("../models/project.model");

const getprojectById = async (req, res, next, projectId) => {
  // Get project details from project model and
  // attach to request object
  // https://expressjs.com/en/4x/api.html#router.param
  console.log("Trigger getprojectByID");
  Project.findById(projectId).exec((error, result) => {
    if (error || !result) {
      res.status(404).json({
        message: "[ERROR] [Controller] project not found!",
      });
      return;
    } else {
      console.log("project found!");
    }
    req.project = result;
    next();
  });
};

const getOneproject = async (req, res) => {
  console.log("Trigger getOneproject");
  // Take req.project value from previous function "getprojectById"
  if (!req.project) {
    res.status(400).json({
      message: "[ERROR] project not found!",
    });
  } else {
    res.status(200).json({
      project: req.project,
    });
  }
};

const getAllproject = async (req, res) => {
  console.log("Trigger getAllproject");
  const projects = await Project.find();
  if (projects) {
    res.status(200).json({
      message: "Get all project successfully!",
      projects: projects,
    });
  } else {
    res.status(400).json({
      message: "[ERROR] [getAll] Something went wrong",
    });
  }
};

const createproject = async (req, res) => {
  console.log("Invoked createproject");
  const project = new Project(req.body);
  project.save((error, result) => {
    if (error || !result) {
      res.status(400).json({
        message: "[ERROR] [create]",
        errMsg: error.message,
      });
    } else {
      res.status(200).json({
        message: "Create project successfully!",
      });
    }
  });
};

const putproject = async (req, res) => {
  const project = req.project;
  // typeof req.body.name === "undefined"
  //   ? (project.name = project.name)
  //   : (project.name = req.body.name);
  typeof req.body.projectname !== "undefined" && (project.projectname = req.body.projectname);
  typeof req.body.customer !== "undefined" && (project.customer = req.body.customer);
  typeof req.body.startDate !== "undefined" &&
    (project.startDate = req.body.startDate);
  typeof req.body.isDeleted !== "undefined" &&
    (project.isDeleted = req.body.isDeleted);

  Project.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update project successfully",
      project: project,
    });
  });
};

// findOneAndDelete() returns the deleted document after having deleted it
// (in case you need its contents after the delete operation);
// deleteOne() is used to delete a single document
// remove() is a deprecated function and has been replaced by deleteOne()
// (to delete a single document) and deleteMany() (to delete multiple documents)
// findOneAndDelete() should be able to delete on _id.

const deleteproject = async (req, res) => {
  // console.log("Invoked deleteproject");
  // Take req.project value from previous function "getprojectById"
  const project = req.project;
  // project.remove((error, result) => {
  //   if (error || !result) {
  //     res
  //       .status(400)
  //       .json({ message: "[ERROR] [delete] Something went wrong" });
  //   } else {
  //     res.status(200).json({
  //       message: "Delete project successfully!",
  //       deletedproject: project,
  //     });
  //   }
  // });

  // result= `1` if MongoDB deleted a doc,
  // `0` if no docs matched the filter `{ name: ... }`
  Project.deleteOne({ _id: project._id }, (error, result) => {
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

const deleteAllproject = async (req, res) => {
  console.log("Invoked deleteAllproject");
  // const count = req.body.count;
  // Removes all documents that match the filter from a collection.
  // To delete all documents in a collection,
  // pass in an empty document ({ }).
  Project.deleteMany((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[ERROR] [deleteAll] Something went wrong",
      });
    }
    res.json({
      message: "Delete all project successfully!",
    });
  });
};

module.exports = {
  getprojectById,
  getAllproject,
  createproject,
  deleteproject,
  deleteAllproject,
  putproject,
};
