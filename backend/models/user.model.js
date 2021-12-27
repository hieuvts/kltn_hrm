const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const userScheema = new Schema({
  username: {
    type: String,
    require: true,
    default: "user",
    minlength: 2,
    maxlength: 50,
  },
  password: {
    type: String,
    require: true,
    default: "password",
    minlength: 2,
    maxlength: 50,
  },
  employee: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  levelAccses: {
    type: Number,
    default: 1,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

userScheema.index({ username: "text" });
module.exports = mongoose.model("user", userScheema);
