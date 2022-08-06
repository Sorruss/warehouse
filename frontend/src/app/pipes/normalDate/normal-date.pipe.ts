import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalDate',
})
export class NormalDatePipe implements PipeTransform {
  transform(initialValue: Date, short: boolean = false): string {
    let date;
    if (initialValue) {
      date = new Date(initialValue);
    } else {
      date = new Date();
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
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    if (!short) {
      return `${month} ${day}(${weekDayNumber}) ${hours}:${minutes}`;
    } else {
      return `${month}(${weekDayNumber}) ${hours}:${minutes}`;
    }
  }
}
