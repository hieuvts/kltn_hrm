const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const taskScheema = new Schema({
    name:{
        type: String,
        require: true,
        default: "task",
        minlength: 2,
        maxlength: 50
    },
    volume:{
        type: Number,
        required: true,
        default: 0,
    },
    employeeID: {
        type: String,
        default: "",
        required: true
    },
    difficulty: {
        type: Number,
        default: 1,
        required: true
    },
    projectID: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean
    }
});
module.exports = mongoose.model("task", taskScheema);