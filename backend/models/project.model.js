const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const projectScheema = new Schema({
    name:{
        type: String,
        require: true,
        default: "project",
        minlength: 2,
        maxlength: 50
    },
    customer:{
        type: String,
        require: true,
        default: "customer",
        minlength: 2,
        maxlength: 50
    },
    startDate: {
        type: String,
        default: "",
        required: true
    },
    isDeleted: {
        type: Boolean
    }
});
module.exports = mongoose.model("project", projectScheema);