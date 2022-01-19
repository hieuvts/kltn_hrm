const db = require("../models");
const { Op } = require("sequelize");
const Project = db.Project;
const Task = db.Task;
const moment = require("moment");

const getProject = async (req, res) => {
  const searchQuery = req.query.search;
  console.log("invoke get project search ", searchQuery);
  Project.findAll({
    include: [Task],
    where: {
      [Op.or]: [{ name: { [Op.like]: `%${searchQuery}%` } }],
    },
  })
    .then((projects) => {
      if (projects) {
        res.status(200).json(projects);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllProject");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllProject");
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllProject", error);
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createProject = async (req, res) => {
  const dataToInsert = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    departmentID: req.body.departmentID,
  };
  Project.create(dataToInsert)
    .then((project) => {
      res.status(200).json({
        message: "Create projects successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createProject");
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllProject");
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const updateProject = async (req, res) => {
  console.log("invoked update", req.query.id);
  Project.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateProject");
        res.status(200).json({
          message: "Update project successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] updateProject");
        return res.status(400).json({
          message: "Can't update project",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updateProject");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteProject = async (req, res) => {
  console.log("==> ", req.query.id);
  Project.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteProject");
        res.status(200).json({
          message: "Delete project successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteProject");
        return res.status(400).json({
          message: "Can't delete project",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteProject");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllProject = async (req, res) => {
  Project.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteproject rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all project successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteproject");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getProject,
  createProject,
  deleteProject,
  updateProject,
  deleteAllProject,
};
