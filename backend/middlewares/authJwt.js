require("dotenv").config({ path: "./config/.env" });
const db = require("../models");
const AuthAccount = db.AuthAccount;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "[WARNING] Unauthorized!", error: err });
    }
    req.authAccountID = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  AuthAccount.findOne({
    where: { email: req.body.email },
  }).then((err, authAccount) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (authAccount.privilege.toUpperCase() === "admin".toUpperCase()) {
      next();
      return;
    }
    res.status(403).send({ message: "Require admin role!" });
    return;
  });
};

const isModerator = (req, res, next) => {
  AuthAccount.findOne({
    where: { email: req.body.email },
  }).then((err, authAccount) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (authAccount.privilege.toUpperCase() === "moderator".toUpperCase()) {
      next();
      return;
    }
    res.status(403).send({ message: "Require moderator role!" });
    return;
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
};
