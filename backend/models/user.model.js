const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    default: "email@example.com",
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    require: true,
    default: "password",
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  employee: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  levelAccses: {
    type: Number,
    default: 1,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.index({ username: "text" });
module.exports = mongoose.model("user", userSchema);
