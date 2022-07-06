import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, n: number): string {
    if (value.length > n) {
      return value.slice(0, n) + ' ...';
    } else {
      return value;
    }
  }
}
