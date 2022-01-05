require("dotenv").config({ path: "./config/.env" });
const Role = require("../models/role.model");
const User = require("../models/user.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

const signUp = (req, res, next) => {
  console.log("invoke signUp");
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    // If user provide a custom role (not Admin, Moderator, User)
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
            next();
            // res.send({ message: "Account was registered successfully!" });
          });
        }
      );
    } else {
      // If user not provide any role -> Assign them to "admin" role
      Role.findOne({ name: "admin" }, (err, role) => {
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
          next();
          // res.send({ message: "Admin account was registered successfully!" });
        });
      });
    }
  });
};

const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .populate("employee")
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
      console.log("check be4 send to client \n", user);
      // OK - Success
      res.status(200).send({
        id: user._id,
        email: user.email,
        roles: authorities,
        accessToken: token,
        employee: user.employee[0],
      });
    });
};

module.exports = {
  signUp,
  login,
};
