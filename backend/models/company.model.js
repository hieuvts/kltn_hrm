const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const companySchema = new Schema({
  name: {
    type: String,
    require: true,
    default: "Company",
    minlength: 1,
    maxlength: 250,
  },
  typeOfCompany: {
    type: String,
    required: true,
    default: "Sole proprietorships",
  },
  mainBusinessLines: {
    type: String,
    required: true,
    default: "Others",
  },
  establishedDate: {
    type: Date,
    required: true,
    min: "1900-01-01",
    default: moment(Date.now()).format("YYYY-MM-DD"),
  },
  address: {
    type: String,
    require: true,
    default: "Address",
    minlength: 1,
    maxlength: 250,
  },
  address2: {
    type: String,
    require: false,
    default: "Address 1",
    minlength: 1,
    maxlength: 250,
  },
  phoneNumber: {
    type: String,
    require: true,
    default: "Phone Number",
    minlength: 8,
    maxlength: 15,
  },
  fax: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 15,
  },
  email: {
    type: String,
    require: true,
    default: "email@example.com",
    minlength: 3,
    maxlength: 250,
  },
  website: {
    type: String,
    require: false,
    default: "example.com",
    minlength: 1,
    maxlength: 250,
  },
  taxCode: {
    type: String,
    require: false,
    minlength: 1,
    maxlength: 250,
  },
});

roleSchema.index({ name: "text" });
module.exports = mongoose.model("role", roleSchema);
