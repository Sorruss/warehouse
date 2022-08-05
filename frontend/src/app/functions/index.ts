// @ts-ignore
import PizZipUtils from 'pizzip/utils/index.js';

export function loadFile(url: string, callback: Function): any {
  PizZipUtils.getBinaryContent(url, callback);
}

export function getDate(initialValue: any = ''): any {
  let date;
  if (initialValue) {
    date = new Date(initialValue);
  } else {
    date = new Date();
    // date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  const weekDayNumber = date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return { month, day, weekDayNumber, hours, minutes };
}

export function getCurrentDateTime(): any {
  const { month, day, weekDayNumber, hours, minutes } = getDate();

  const dateFile =
    month + '_' + day + '(' + weekDayNumber + ')' + '_' + hours + '_' + minutes;
  const dateDocument =
    month + ' ' + day + '(' + weekDayNumber + ')' + ' ' + hours + ':' + minutes;

  return { dateFile, dateDocument };
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
