require("dotenv").config({ path: "./config/.env" });
const db = require("../models");
const AuthAccount = db.AuthAccount;
const Op = db.Sequelize.Op;
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

      var token = jwt.sign({ id: authAccount.id }, jwtSecret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: authAccount.id,
        email: authAccount.email,
        privilege: authAccount.privilege,
        accessToken: token,
      });
    })
    .catch((error) => {
      console.log("error when login", error);
      return res.status(401).send({ error: error.message });
    });
};

const verifyOldPassword = async (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }

    if (!user) {
      // Not found
      console.log("invoked verify not found user");
      return res.status(404).send({ message: "Account not found!" });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );

    if (!passwordIsValid) {
      // Unauthorized
      console.log("invoked verify passworld invalid");
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }
    req.userId = user._id;
    next();
  });
};
const changePassword = async (req, res) => {
  let newPassword = bcrypt.hashSync(req.body.password, 8);
  User.findByIdAndUpdate(
    req.userId,
    { password: newPassword },

    (error, result) => {
      if (error || !result) {
        console.log("invoked changePwd error");
        console.log("error ", error);
        return res.status(500).send(error);
      }
      console.log("invoked changePwd");
      return res.status(200).send(result);
    }
  );
};
module.exports = {
  signUp,
  login,
  verifyOldPassword,
  changePassword,
};
