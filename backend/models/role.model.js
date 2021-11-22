const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const roleScheema = new Schema({
    name:{
        type: String,
        require: true,
        default: "role",
        minlength: 2,
        maxlength: 50
    },
    roleLevel: {
        type: Number,
        default: 0,
        required: true
    },
    isDeleted: {
        type: Boolean
    }
});
module.exports = mongoose.model("role", roleScheema);