const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const chatMessageSchema = new Schema(
  {
    chatRoom: [{ type: Schema.Types.ObjectId, ref: "chatRoom" }],
    // sender: email, name (combines fname + lname)
    sender: [
      {
        type: String,
      },
    ],
    message: {
      type: String,
    },

    isBroadcast: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatMessage", chatMessageSchema);
