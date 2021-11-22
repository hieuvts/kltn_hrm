const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const validator = require("validator");

const feedbackFromEmployeeScheema = new Schema({
    title:{
        type: String,
        require: true,
        default: "feedbackFromEmployee",
        minlength: 2,
        maxlength: 50
    },
    content:{
        type: String,
        require: true,
        default: "content",
        minlength: 2,
        maxlength: 1000
    },
    employeeID: {
        type: String,
        default: "",
        required: true
    },
    isDeleted: {
        type: Boolean
    }
});
module.exports = mongoose.model("feedbackfromemployee", feedbackFromEmployeeScheema);