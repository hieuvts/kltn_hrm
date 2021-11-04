const mongoose = require("mongoose");
mongoose.pluralize(null); // Prevent pluralize collection name ('data' -> 'datas')
const Schema = mongoose.Schema;
const validator = require("validator");

// https://mongoosejs.com/docs/schematypes.html
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Employee",
    minlength: 2,
    maxlength: 10,
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
    max: "2020-01-01",
  },
  phoneNumber: { type: String, required: true },
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
  role: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
});

module.exports = mongoose.model("employee", employeeSchema);
