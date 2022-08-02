const functions = {};

function getDate() {
  const today = new Date();
  const custom_months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const custom_days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date =
    custom_months[today.getMonth()] +
    " " +
    custom_days[today.getDay()] +
    "(" +
    today.getDate() +
    ")";
  const time =
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes());
  return date + " " + time;
}
functions.getDate = getDate;

module.exports = functions;
