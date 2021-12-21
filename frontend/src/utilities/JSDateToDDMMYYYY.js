import moment from "moment";

export default function DMYFormatter(date) {
  console.log("Default: ", date);
  var DateInDMY = moment(date).format("YYYY-MM-DD");
  console.log("Formatted date: ", DateInDMY);
  console.log("Formatted date type: ", typeof DateInDMY);
  return DateInDMY.split("/").join("-");
}
