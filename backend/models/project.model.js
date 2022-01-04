const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const projectSchema = new Schema({
  name: {
    type: String,
    require: true,
    default: "project",
    minlength: 2,
    maxlength: 50,
  },
  employee: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  customer: {
    type: String,
    require: true,
    default: "customer",
    minlength: 2,
    maxlength: 50,
  },
  startDate: {
    type: Date,
    min: "1900-01-01",
  },
  endDate: {
    type: Date,
    min: "1900-01-01",
  },
  departments: [{ type: Schema.Types.ObjectId, ref: "department" }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

projectSchema.index({ name: "text", customer: "text" });
module.exports = mongoose.model("project", projectSchema);
