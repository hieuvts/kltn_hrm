import moment from "moment";

export default function clockTimer() {
  const currentTime = moment().format("HH:mm");
  return currentTime.toString();
}
