require("dotenv").config({ path: "./config/.env" });
const { Op } = require("sequelize");
const db = require("../models");
const AuthAccount = db.AuthAccount;
const ChatMessage = db.ChatMessage;
const ChatRoom = db.ChatRoom;
const ChatRoomDetails = db.ChatRoomDetails;
const Company = db.Company;
const Employee = db.Employee;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

const signUp = (req, res, next) => {
  console.log("invoke signUp", req.body);
  const dataToInsert = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    privilege: req.body.privilege ? req.body.privilege : "user",
    companyID: req.body.companyID ? req.body.companyID : "1",
  };
  AuthAccount.create(dataToInsert)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Sign up not successfully!", error: error });
    });
};

const login = (req, res) => {
  AuthAccount.findOne({
    where: { email: req.body.email },
    include: [Employee],
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
      // res.status(200).send({
      //   id: authAccount.id,
      //   email: authAccount.email,
      //   privilege: authAccount.privilege,
      //   companyID: authAccount.companyID,
      //   accessToken: token,
      // });
      console.log("emp ", authAccount.Employee);
      res.status(200).send({
        id: authAccount.id,
        email: authAccount.email,
        privilege: authAccount.privilege,
        companyID: authAccount.companyID,
        accessToken: token,
        employee: authAccount.Employee,
      });
    })
    .catch((error) => {
      console.log("error when login", error);
      return res.status(401).send({ error: error.message });
    });
};

const changePassword = async (req, res) => {
  console.log("changePassword", req.body);
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

const deleteAuthAccount = async (req, res) => {
  console.log("==> ", req.query.id);
  AuthAccount.destroy({ where: { id: req.query.id } })
    .then((affectedRows) => {
      if (affectedRows == 1) {
        console.log("[SUCCESS] delete authAccount");
        res.status(200).json({
          message: "Delete authAccount successfully",
        });
      } else {
        console.log("[Can't] delete authAccount");
        return res.status(400).json({
          message: "Can't delete authAccount",
        });
      }
    })
    .catch((error) => {
      console.log("[ERROR] deleteCompany");
      return res.status(500).json({
        error: error,
      });
    });
};

const getChatRooms = (req, res) => {
  console.log("invoked getChatRooms", req.query);
  AuthAccount.findOne({
    where: {
      id: req.query.id,
    },
    include: [
      {
        model: ChatRoom,
        where: { name: { [Op.like]: `%${req.query.search}%` } },
        through: {
          attributes: [],
        },
        include: [
          {
            model: ChatMessage,
          },
        ],
      },
    ],
    order: [
      [ChatRoom, "updatedAt", "ASC"],
      [ChatRoom, ChatMessage, "updatedAt", "ASC"],
    ],
  })
    .then((authAccount) => {
      console.log("authAccount chat", authAccount);
      if (!authAccount) {
        return res.status(404).send({
          message: `Not found any chatrooms`,
        });
      }
      res.status(200).send(authAccount);
    })
    .catch((error) => {
      console.log("error when get chatRooms", error);
      return res.status(401).send({ error: error.message });
    });
};
module.exports = {
  signUp,
  login,
  getChatRooms,
  changePassword,
  deleteAuthAccount,
};
