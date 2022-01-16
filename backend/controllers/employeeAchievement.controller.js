const db = require("../models");
const EmployeeAchievement = db.EmployeeAchievement;
const Employee = db.Employee;
const moment = require("moment");

const getEmployeeAchievement = async (req, res) => {
  EmployeeAchievement.findAll({
    include: [Employee],
  })
    .then((employeeAchievements) => {
      if (employeeAchievements) {
        res.status(200).json(employeeAchievements);
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] getAllEmployeeAchievement"
        );
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(
          moment().format("hh:mm:ss"),
          "[ERROR] getAllEmployeeAchievement"
        );
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getAllEmployeeAchievement",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const createEmployeeAchievement = async (req, res) => {
  const dataToInsert = req.body;
  EmployeeAchievement.create(dataToInsert)
    .then((employeeAchievements) => {
      res.status(200).json({
        message: "Add Achievement successfully!",
      });
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] createEmployeeAchievement"
      );
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] createEmployeeAchievement"
      );
      res.status(500).json({
        message: "[ERROR] [create] Something went wrong",
        error: error,
      });
    });
};

const updateEmployeeAchievement = async (req, res) => {
  console.log("invoked update");
  EmployeeAchievement.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] updateEmployeeAchievement"
        );
        res.status(200).json({
          message: "Update EmployeeAchievement successfully",
        });
      } else {
        console.log(
          moment().format("hh:mm:ss"),
          "[Can't] updateEmployeeAchievement"
        );
        return res.status(400).json({
          message: "Can't update EmployeeAchievement",
        });
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] updateEmployeeAchievement"
      );
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteEmployeeAchievement = async (req, res) => {
  console.log("==> ", req.query.id);
  EmployeeAchievement.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] deleteEmployeeAchievement"
        );
        res.status(200).json({
          message: "Delete EmployeeAchievement successfully",
        });
      } else {
        console.log(
          moment().format("hh:mm:ss"),
          "[Can't] deleteEmployeeAchievement"
        );
        return res.status(400).json({
          message: "Can't delete EmployeeAchievement",
        });
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] deleteEmployeeAchievement"
      );
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllEmployeeAchievement = async (req, res) => {
  EmployeeAchievement.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteEmployeeAchievement rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all EmployeeAchievement successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] deleteEmployeeAchievement"
      );
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getEmployeeAchievement,
  createEmployeeAchievement,
  deleteEmployeeAchievement,
  updateEmployeeAchievement,
  deleteAllEmployeeAchievement,
};
