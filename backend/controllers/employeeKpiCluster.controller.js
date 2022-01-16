const db = require("../models");
const EmployeeKpiCluster = db.employeeKpiCluster;
const Employee = db.Employee;
const moment = require("moment");
const { spawn } = require("child_process");
const { once } = require('events');
var dataFromCSV = {};

const getEmployeeKpiClusterFromCSV = async (req, res) => {
  // spawn new child process to call the python Ascript
  let dataReturn = {};
  const python = spawn('python', ['script1.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataReturn = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataReturn)
    dataFromCSV = eval(dataReturn);
  });
  await once(python, 'close')
  console.log(dataFromCSV)
}

const getEmployeeKpiCluster = async (req, res) => {
  EmployeeKpiCluster.findAll({
    include: [Employee],
  })
    .then((employeeKpiClusters) => {
      if (employeeKpiClusters) {
        res.status(200).json(employeeKpiClusters);
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] getEmployeeKpiCluster"
        );
      } else {
        res.status(400).json({
          message: "[ERROR] [getAll] Something went wrong",
        });
        console.log(
          moment().format("hh:mm:ss"),
          "[ERROR] getEmployeeKpiCluster"
        );
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] getEmployeeKpiCluster",
        error
      );
      res.status(500).json({
        message: "[ERROR] [getAll] Something went wrong",
        error: error,
      });
    });
};

const importDataFromCSV = async (req, res) => {
  const dataInsert = dataFromCSV ?? [];
  if (! dataInsert || dataInsert.length === 0) {
    console.log("[importDataFromCSV] Data insert null");
    return;
  }
  EmployeeKpiCluster.bulkCreate(dataInsert).then((employeeKpiClusters) => {
    res.status(200).json({
      message: "Add KPI Cluster successfully!",
    });
    console.log(
      moment().format("hh:mm:ss"),
      "[SUCCESS] createEmployeeKpiCluster"
    );
  })
  .catch((error) => {
    console.log(
      moment().format("hh:mm:ss"),
      "[ERROR] createEmployeeKpiCluster"
    );
    res.status(500).json({
      message: "[ERROR] [create] Something went wrong",
      error: error,
    });
  });
}

const createEmployeeKpiCluster = async (req, res) => {
  const dataToInsert = req.body;
  EmployeeKpiCluster.create(dataToInsert)
    .then((employeeKpiClusters) => {
      res.status(200).json({
        message: "Add KPI Cluster successfully!",
      });
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] createEmployeeKpiCluster"
      );
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] createEmployeeKpiCluster"
      );
      res.status(500).json({
        message: "[ERROR] [create] Something went wrong",
        error: error,
      });
    });
};

const updateEmployeeKpiCluster = async (req, res) => {
  console.log("invoked update");
  EmployeeKpiCluster.update(req.body, {
    where: { id: req.query.id },
  })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] updateEmployeeKpiCluster"
        );
        res.status(200).json({
          message: "Update EmployeeKpiCluster successfully",
        });
      } else {
        console.log(
          moment().format("hh:mm:ss"),
          "[Can't] updateEmployeeKpiCluster"
        );
        return res.status(400).json({
          message: "Can't update EmployeeKpiCluster",
        });
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] updateEmployeeKpiCluster"
      );
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteEmployeeKpiCluster = async (req, res) => {
  console.log("==> ", req.query.id);
  EmployeeKpiCluster.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log(
          moment().format("hh:mm:ss"),
          "[SUCCESS] deleteEmployeeKpiCluster"
        );
        res.status(200).json({
          message: "Delete EmployeeKpiCluster successfully",
        });
      } else {
        console.log(
          moment().format("hh:mm:ss"),
          "[Can't] deleteEmployeeKpiCluster"
        );
        return res.status(400).json({
          message: "Can't delete EmployeeKpiCluster",
        });
      }
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] deleteEmployeeKpiCluster"
      );
      return res.status(500).json({
        error: error,
      });
    });
};

const deleteAllEmployeeKpiCluster = async (req, res) => {
  EmployeeKpiCluster.destroy({ where: {}, truncate: false })
    .then((affectedRows) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[SUCCESS] deleteAllEmployeeKpiCluster rows= ",
        affectedRows
      );
      res.status(200).json({
        message: "Delete all EmployeeKpiCluster successfully",
        affectedRows: affectedRows,
      });
    })
    .catch((error) => {
      console.log(
        moment().format("hh:mm:ss"),
        "[ERROR] deleteAllEmployeeKpiCluster"
      );
      return res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  importDataFromCSV,
  getEmployeeKpiClusterFromCSV,
  getEmployeeKpiCluster,
  createEmployeeKpiCluster,
  deleteEmployeeKpiCluster,
  updateEmployeeKpiCluster,
  deleteAllEmployeeKpiCluster,
};
