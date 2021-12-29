const Role = require("../models/role.model");
const User = require("../models/user.model");

const defaultRoles = ["user", "admin", "moderator"];
const checkExistedEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }
    if (user) {
      res.status(400).send({
        message: `The user with email ${res.body.email} has already been registered!`,
      });
      return;
    }
    next();
  });
};

const checkRolesIsExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!defaultRoles.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `[FAILED] Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

module.exports = {
  checkExistedEmail,
  checkRolesIsExisted,
};
