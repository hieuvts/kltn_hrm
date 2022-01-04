const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const messageSchema = new Schema({
  username: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  room: {
    type: String,
  },
});

module.exports = mongoose.model("message", messageSchema);
