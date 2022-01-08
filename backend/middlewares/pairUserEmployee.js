const Employee = require("../models/employee.model");
const Role = require("../models/role.model");
const Department = require("../models/department.model");
const User = require("../models/user.model");

const pairHelper = async (req, res) => {
  console.log("req.body ", req.employeeId);
  const user = new User(req.body);
  User.findOneAndUpdate(
    { email: req.body.email },
    { employee: req.employeeId },
    (error, result) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
      res.send({
        message: `Create employee successfully!`,
      });
      return;
    }
  );
};
module.exports = { pairHelper };
