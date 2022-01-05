const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const chatMessageSchema = require("./chatMessage.model");

const chatRoomSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    name: {
      type: String,
    },
    messages: [
      {
        // sender: email, name (combines fname + lname)
        sender: {
          type: String,
        },
        message: {
          type: String,
        },

        isBroadcast: {
          type: Boolean,
        },
        createdAt: {
          type: Date,
          default: new Date().toISOString(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatRoom", chatRoomSchema);
