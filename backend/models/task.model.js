const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const taskScheema = new Schema({
  name: {
    type: String,
    require: true,
    default: "task",
    minlength: 2,
    maxlength: 50,
  },
  volume: {
    type: Number,
    required: true,
    default: 0,
  },
  employeeID: {
    type: String,
    default: "",
    required: true,
  },
  difficulty: {
    type: Number,
    default: 1,
    required: true,
  },
  project: [{ type: Schema.Types.ObjectId, ref: "project" }],
  employee: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

taskScheema.index({ name: "text" });
module.exports = mongoose.model("task", taskScheema);
