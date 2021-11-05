const mongoose = require("mongoose");
mongoose.pluralize(null); // Prevent pluralize collection name ('data' -> 'datas')
const Schema = mongoose.Schema;
const validator = require("validator");

// https://mongoosejs.com/docs/schematypes.html
const departmentSchema = new Schema({
    name: {
      type: String,
      required: true,
      default: "department",
      minlength: 2,
      maxlength: 50,
    },
    headOfDepartment: {
        type: String,
        require: true,
        default: "leader",
        minlength: 2,
        maxlength: 50
    },
    isDeleted: {
      type: Boolean,
    }
  });
  module.exports = mongoose.model("department", departmentSchema);