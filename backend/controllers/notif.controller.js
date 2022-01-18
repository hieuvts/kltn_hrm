const db = require("../models");
const Notification = db.Notification;
const moment = require("moment");

const getNotif = async (req, res) => {
  console.log("get notif ", req.query.id);
  Notification.findAll({
    where: { authAccountID: req.query.id },
  })
    .then((tasks) => {
      if (tasks) {
        res.status(200).json(tasks);
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] getNotif");
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(moment().format("hh:mm:ss"), "[ERROR] getNotif");
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] getNotif", error);
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const markNotifAsRead = async (req, res) => {
  console.log("invoked update Notifications");
  Notification.update(req.body, {
    where: { authAccountID: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] markNotifAsRead");
        res.status(200).json({
          message: "Update task successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] markNotifAsRead");
        return res.status(400).json({
          message: "Can't update markNotifAsRead",
        });
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] markNotifAsRead ",
        error
      );
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteNotif = async (req, res) => {
  Notification.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteNotif");
        res.status(200).json({
          message: "Delete notification successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteNotif");
        return res.status(400).json({
          message: "Can't deleteNotif",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteNotif");
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllNotif = async (req, res) => {
  Notification.destroy({ where: { authAccountID: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(moment().format("hh:mm:ss"), "[SUCCESS] deleteAllNotif");
        res.status(200).json({
          message: "Delete ALL notification successfully",
        });
      } else {
        console.log(moment().format("hh:mm:ss"), "[Can't] deleteAllNotif");
        return res.status(400).json({
          message: "Can't deleteAllNotif",
        });
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] deleteAllNotif");
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  getNotif,
  markNotifAsRead,
  deleteNotif,
  deleteAllNotif,
};
