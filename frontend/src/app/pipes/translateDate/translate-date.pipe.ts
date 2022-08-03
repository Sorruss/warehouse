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

    this.translateService.get(month).subscribe((data) => {
      month = data;
    });
    this.translateService.get(day).subscribe((data) => {
      day = data;
    });

    return month + ' ' + day + '(' + other;
  }
}
