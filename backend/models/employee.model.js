const mongoose = require("mongoose");
mongoose.pluralize(null); // Prevent pluralize collection name ('data' -> 'datas')
const Schema = mongoose.Schema;
const validator = require("validator");
const moment = require("moment");

// https://mongoosejs.com/docs/schematypes.html
// https://docs.mongodb.com/manual/reference/operator/aggregation/strLenCP/
const employeeSchema = new Schema({
  fname: {
    type: String,
    default: "First name",
    minlength: 1,
    maxlength: 35,
  },
  lname: {
    type: String,
    default: "Last name",
    minlength: 1,
    maxlength: 35,
  },
  gender: {
    type: String,
    default: "Male",
    max: 10,
    // Only accepts these values
    enum: ["Male", "Female", "Other"],
  },
  // https://mongoosejs.com/docs/tutorials/dates.html
  dateOfBirth: {
    type: Date,
    min: "1900-01-01",
  },
  phoneNumber: { type: String, min: 8, max: 15 },
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
    max: 150,
  },
  roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
  departments: [{ type: Schema.Types.ObjectId, ref: "department" }],
  project: [{ type: Schema.Types.ObjectId, ref: "project" }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

employeeSchema.index({
  fname: "text",
  lname: "text",
  email: "text",
  phoneNumber: "text",
});
// Collection name that will appear in MongoDB
module.exports = mongoose.model("employee", employeeSchema);
