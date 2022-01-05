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
  manager: {
    type: String,
    require: true,
    default: "leader",
    minlength: 2,
    maxlength: 50,
  },
  employee: [{ type: Schema.Types.ObjectId, ref: "employee" }],
  amount :{
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

departmentSchema.index({ name: "text", headOfDepartment: "text" });
module.exports = mongoose.model("department", departmentSchema);
