import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateDate',
})
export class TranslateDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}
  transform(value: string): string {
    const [date, other] = value.split('(');
    let [month, day] = date.split(' ');

    console.log(month, day);

    this.translateService.get(month).subscribe((data) => {
      month = data;
    });
    if (day) {
      this.translateService.get(day).subscribe((data) => {
        day = data;
      });
    } else {
      day = '';
    }

    return month + (day ? ' ' : '') + day + '(' + other;
  }
}
