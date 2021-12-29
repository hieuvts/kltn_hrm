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
  address: {
    type: String,
    require: true,
    default: "Address",
    minlength: 1,
    maxlength: 250,
  },
  address1: {
    type: String,
    require: false,
    default: "Address 1",
    minlength: 1,
    maxlength: 250,
  },
  // city: {
  //   type: String,
  //   require: true,
  //   default: "City",
  //   minlength: 1,
  //   maxlength: 250,
  // },
  // state: {
  //   type: String,
  //   require: true,
  //   default: "State",
  //   minlength: 1,
  //   maxlength: 250,
  // },
  // country: {
  //   type: String,
  //   require: true,
  //   default: "Country",
  //   minlength: 1,
  //   maxlength: 250,
  // },
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
    default: "Fax",
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
  tax: {
    type: String,
    require: false,
    default: "Tax",
    minlength: 1,
    maxlength: 250,
  },
});

roleSchema.index({ name: "text" });
module.exports = mongoose.model("role", roleSchema);
