const db = require("../models");
const EmploymentHistory = db.EmploymentHistory;
const moment = require("moment");

const getEmploymentHistoryByID = async (req, res) => {
  EmploymentHistory.findOne({
    where: { employeeID: req.query.employeeID },
  })
    .then((employmentHistory) => {
      if (employmentHistory) {
        return res.status(200).json(employmentHistory);
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] employmentHistory",
        error
      );
      return res.status(500).json({
        error: error,
      });
    });
};
module.exports = {
  getEmploymentHistoryByID,
};
