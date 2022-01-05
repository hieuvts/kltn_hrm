const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    default: "email@example.com",
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
    required: true,
  },

  password: {
    type: String,
    require: true,
    default: "password",
    minLength: 2,
    required: true,
  },
  employee: { type: Schema.Types.ObjectId, ref: "employee" },
  roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
  chatRooms: [{ type: Schema.Types.ObjectId, ref: "chatRoom" }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.index({ username: "text" });
module.exports = mongoose.model("user", userSchema);
