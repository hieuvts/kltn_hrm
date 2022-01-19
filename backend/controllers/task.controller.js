const db = require("../models");
const Task = db.Task;
const moment = require("moment");

const getTask = async (req, res) => {
  Task.findAll()
    .then((tasks) => {
      if (tasks) {
        res.status(200).json(tasks);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getAllTask");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getAllTask");
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getAllTask", error);
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createTask = async (req, res) => {
  const dataToInsert = req.body;
  Task.create(dataToInsert)
    .then((task) => {
      res.status(200).json({
        message: "Create tasks successfully!",
      });
      console.log(moment().format("hh:mm:ss"), "[SUCCESS] createTask");
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] createTask \n", error);
      res.status(500).json({
        message: "[ERROR] [create] Something went wrong",
        error: error,
      });
    });
};

const updateTask = async (req, res) => {
  console.log("invoked update");
  Task.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] updateTask");
        res.status(200).json({
          message: "Update task successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] updateTask");
        return res.status(400).json({
          message: "Can't update task",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] updatetask ", error);
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteTask = async (req, res) => {
  console.log("==> ", req.query.id);
  Task.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteTask");
        res.status(200).json({
          message: "Delete task successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteTask");
        return res.status(400).json({
          message: "Can't delete task",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteTask");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllTask = async (req, res) => {
  Task.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deletetask rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all task successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteTask");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getTask,
  createTask,
  deleteTask,
  updateTask,
  deleteAllTask,
};
