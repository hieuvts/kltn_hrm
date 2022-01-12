const db = require("../models");
const AuthAccount = db.AuthAccount;
const defaultRoles = ["user", "admin", "moderator"];

const checkExistedEmail = (req, res, next) => {
  AuthAccount.findOne({
    where: { email: req.body.email },
  })
    .then((authAccount) => {
      if (authAccount) {
        res.status(400).send({
          message: `The user with email ${req.body.email} has already been registered!`,
        });
        return;
      }
      next();
    })
    .catch((error) => {
      res.status(500).send({ message: error });
      return;
    });
};

module.exports = {
  checkExistedEmail,
};
