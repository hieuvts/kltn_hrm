require("dotenv").config({ path: "./config/.env" });
const db = require("../models");
const AuthAccount = db.AuthAccount;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

const signUp = (req, res, next) => {
  console.log("invoke signUp");
  const dataToInsert = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    privilege: req.body.privilege ? req.body.privilege : "user",
    companyID: req.body.companyID,
  };
  AuthAccount.create(dataToInsert)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error when trying to create new account",
      });
    });
};

const login = (req, res) => {
  AuthAccount.findOne({
    where: { email: req.body.email },
  })
    .then((authAccount) => {
      if (!authAccount) {
        return res.status(404).send({
          message: `Account with email ${req.body.email} not found`,
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        authAccount.password
      );

      if (!passwordIsValid) {
        // Unauthorized
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }

      var token = jwt.sign({ email: authAccount.email }, jwtSecret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: authAccount.id,
        email: authAccount.email,
        privilege: authAccount.privilege,
        companyID: authAccount.companyID,
        accessToken: token,
      });
    })
    .catch((error) => {
      console.log("error when login", error);
      return res.status(401).send({ error: error.message });
    });
};

const changePassword = async (req, res, next) => {
  AuthAccount.findOne({
    where: { email: req.body.email },
  })
    .then((authAccount) => {
      if (!authAccount) {
        return res.status(404).send({
          message: `Account with email ${req.body.email} not found`,
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        authAccount.password
      );

      if (!passwordIsValid) {
        // Unauthorized
        console.log("changePwd.verify password invalid");
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }
      // req.authAccountId = authAccount.id;

      // next();
      let newPassword = bcrypt.hashSync(req.body.password, 8);
      authAccount.update({ password: newPassword }).then((updated) => {
        console.log(
          "Change password successfully",
          JSON.stringify(updated, null, 2)
        );
        return res
          .status(200)
          .send({ message: "Change password successfully" });
      });
      // .catch((error) => {
      //   throw new Error(error);
      // });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
      return;
    });
};
module.exports = {
  signUp,
  login,
  changePassword,
};
