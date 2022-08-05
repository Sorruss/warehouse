const functions = {};

function getDate(initValue) {
  let moment;
  if (initValue) {
    moment = new Date(initValue);
  } else {
    moment = new Date();
    // moment.setMinutes(moment.getMinutes() - moment.getTimezoneOffset());
  }

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
    custom_months[moment.getMonth()] +
    " " +
    custom_days[moment.getDay()] +
    "(" +
    moment.getDate() +
    ")";
  const time =
    moment.getHours() +
    ":" +
    (moment.getMinutes() < 10
      ? `0${moment.getMinutes()}`
      : moment.getMinutes());
  return date + " " + time;
}
functions.getDate = getDate;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
functions.getRandomNumber = getRandomNumber;

module.exports = functions;
