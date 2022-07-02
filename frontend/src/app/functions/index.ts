// @ts-ignore
import PizZipUtils from 'pizzip/utils/index.js';

export function loadFile(url: string, callback: Function): any {
  PizZipUtils.getBinaryContent(url, callback);
}

export function getCurrentDateTime() {
  const today = new Date();
  const custom_months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];
  const custom_days = [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    "П'ятниця",
    'Субота',
  ];
  const dateFile =
    custom_months[today.getMonth()] +
    '_' +
    custom_days[today.getDay()] +
    '(' +
    today.getDate() +
    ')' +
    '_' +
    today.getHours() +
    '_' +
    today.getMinutes();
  const dateDocument =
    custom_months[today.getMonth()] +
    ' ' +
    custom_days[today.getDay()] +
    '(' +
    today.getDate() +
    ')' +
    ' ' +
    today.getHours() +
    ':' +
    today.getMinutes();

  return { dateFile, dateDocument };
}
