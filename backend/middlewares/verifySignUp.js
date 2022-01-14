const db = require("../models");
const AuthAccount = db.AuthAccount;
const defaultRoles = ["user", "admin", "moderator"];

const checkExistedEmail = (req, res, next) => {
  if (typeof req.body.email === "undefined") {
    console.log("Not provide email -> next()");
    next();
    return;
  }
  AuthAccount.findOne({
    where: { email: req.body.email },
  })
    .then((authAccount) => {
      if (authAccount) {
        console.log("Email exists");
        res.status(400).send({
          message: `The user with email ${req.body.email} has already been registered!`,
        });
        return;
      }
      console.log("Email not exists", authAccount);
      next();
    })
    .catch((error) => {
      console.log("[ERROR] checkExistedEmail ", error);
      res.status(500).send({ message: error });
      return;
    });
};

module.exports = {
  checkExistedEmail,
};
