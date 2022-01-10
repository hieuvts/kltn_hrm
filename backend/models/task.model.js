const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const taskSchema = new Schema({
  name: {
    type: String,
    require: true,
    default: "task",
    minlength: 2,
    maxlength: 50,
  },
  assignFrom: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  assignTo: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  procedure: [{ type: Schema.Types.ObjectId, ref: "procedure" }],
  project : [{ type: Schema.Types.ObjectId, ref: "project" }],
  priority: {
    type: String,
    default: "1",
    max: 10,
    // Only accepts these values
    enum: ["1", "2", "3", "Extra"],
  },
  difficulty: {
    type: String,
    default: "1",
    max: 10,
    // Only accepts these values
    enum: ["1", "2", "3", "Extra"],
  },
  deadline: {
    type: Date,
    min: "1900-01-01",
  },
  status: {
    type: String,
    default: "Pending",
    max: 10,
    // Only accepts these values
    enum: ["Pending", "In Progress", "Finish"],
  },
  progress: {
    type: Number,
    required: true,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

taskSchema.index({ name: "text" });
module.exports = mongoose.model("task", taskSchema);
