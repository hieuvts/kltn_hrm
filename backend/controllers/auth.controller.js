require("dotenv").config({ path: "./config/.env" });
const Role = require("../models/role.model");
const User = require("../models/user.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

const signUp = (req, res) => {
  console.log("Invoked signUp");
  console.log("login email=", req.body.email);
  console.log("login pwd=", req.body.password);
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Account was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Account was registered successfully!" });
        });
      });
    }
  });
};

const login = (req, res) => {
  console.log("Invoked login");
  console.log("login.req=", req.body.email);
  console.log("login.req=", req.body.password);
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        // Internal server error
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        // Not found
        return res.status(404).send({ message: "Account not found!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        // Unauthorized
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }

      var token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      // OK - Success
      res.status(200).send({
        id: user._id,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

module.exports = {
  signUp,
  login,
};
