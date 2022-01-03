const Project = require("../models/project.model");
const Department = require("../models/department.model");
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
  let query = req.query.search;
  let projects = {};

  if (typeof query === "undefined" || query.length === 0) {
    console.log("Return all projects");
    projects = await Project.find();
  } else {
    console.log("Return projects with search= ", query);
    projects = await Project.find({
      $text: {
        $search: `"${query}"`,
        // $search: `.*(\b${query}\b).*`,
      },
    });
  }
  
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
  const project = new Project(req.body);
  if(!req.body.departments || req.body.departments.length === 0)
  {
    console.log("not provide departments");
    project.save((error, result) => {
      if (error || !result) {
        res.status(400).json({
          message: "[ERROR] [post] ",
          errMsg: error.message,
        });
      } else {
        res.json({
          message: "Create project successfully!",
        });
      }
    });
  }
  else
  {
    Department.find({
      name: {$in: req.body.departments}
    },
    (error, departments) => {
        if (error || !departments) {
          // save without add departments
          project.save((error, result) => {
            if (error || !result) {
              res.status(400).json({
                message: "[ERROR] [post] ",
                errMsg: error.message,
              });
            } else {
              res.json({
                message: "Create project successfully!",
              });
            }
          });
        } else {
          project.departments = departments.map(
            (department) => department._id
          );
          project.save((error, result) => {
            if (error || !result) {
              res.status(400).json({
                message: "[ERROR] [post] ",
                errMsg: error.message,
              });
            } else {
              res.json({
                message: "Create project successfully!",
              });
            }
          });
        }
      }
    )
  }
};

const putproject = async (req, res) => {
  const project = req.Project;
  // typeof req.body.name === "undefined"
  //   ? (project.name = project.name)
  //   : (project.name = req.body.name);
  typeof req.body.name !== "undefined" && (project.name = req.body.name);
  typeof req.body.volume !== "undefined" && (project.volume = req.body.volume);
  typeof req.body.employeeID !== "undefined" &&
    (project.employeeID = req.body.employeeID);
  typeof req.body.difficulty !== "undefined" &&
    (project.difficulty = req.body.difficulty);
  typeof req.body.projectID !== "undefined" &&
    (project.projectID = req.body.projectID);
  typeof req.body.role !== "undefined" && (project.role = req.body.role);
  typeof req.body.isDeleted !== "undefined" &&
    (project.isDeleted = req.body.isDeleted);

  project.save((error, result) => {
    if (error || !result) {
      return res.status(400).json({
        message: "[UPDATE] Something went wrong",
        error: error,
      });
    }
    res.json({
      message: "Update user successfully",
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
  console.log("Invoked deleteproject");
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
  project.deleteOne({ _id: project._id }, (error, result) => {
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
