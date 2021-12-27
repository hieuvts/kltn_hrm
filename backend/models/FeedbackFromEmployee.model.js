const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const feedbackFromEmployeeSchema = new Schema({
  title: {
    type: String,
    require: true,
    default: "feedbackFromEmployee",
    minlength: 2,
    maxlength: 50,
  },
  content: {
    type: String,
    require: true,
    default: "content",
    minlength: 2,
    maxlength: 1000,
  },
  employeeID: {
    type: String,
    default: "",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

feedbackFromEmployeeSchema.index({ title: "text" });
module.exports = mongoose.model(
  "feedbackfromemployee",
  feedbackFromEmployeeSchema
);
