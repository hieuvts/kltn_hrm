const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const projectScheema = new Schema({
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
    type: String,
    default: "",
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

projectScheema.index({ name: "text", customer: "text" });
module.exports = mongoose.model("project", projectScheema);
