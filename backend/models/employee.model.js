const mongoose = require("mongoose");
mongoose.pluralize(null); // Prevent pluralize collection name ('data' -> 'datas')
const Schema = mongoose.Schema;
const validator = require("validator");
const moment = require("moment");

// https://mongoosejs.com/docs/schematypes.html
// https://docs.mongodb.com/manual/reference/operator/aggregation/strLenCP/
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Employee",
    minlength: 2,
    maxlength: 150,
  },
  gender: {
    type: String,
    required: true,
    default: "Male",
    max: 10,
    // Only accepts these values
    enum: ["Male", "Female", "Other"],
  },
  // https://mongoosejs.com/docs/tutorials/dates.html
  dateOfBirth: {
    type: Date,
    required: true,
    min: "1900-01-01",
    max: moment(Date.now()).format("YYYY-MM-DD"),
  },
  phoneNumber: { type: String, required: true, min: 8, max: 15 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  address: {
    type: String,
    required: true,
    max: 150,
  },
  roleID: {
    type: String,
    max: 10,
    default: "roleID",
  },
  departmentID: [{ type: Schema.Types.ObjectId, ref: "department" }],
  projectID: {
    type: String,
    max: 10,
    default: "projectID",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

employeeSchema.index({ name: "text", email: "text", phoneNumber: "text" });
// Collection name that will appear in MongoDB
module.exports = mongoose.model("employee", employeeSchema);
