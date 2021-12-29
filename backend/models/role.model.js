const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const roleSchema = new Schema({
  name: {
    type: String,
    require: true,
    default: "role",
    minlength: 2,
    maxlength: 50,
  },
  roleLevel: {
    type: Number,
    default: 1,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

roleSchema.index({ name: "text" });
module.exports = mongoose.model("role", roleSchema);
