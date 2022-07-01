import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkLength',
})
export class CheckLengthPipe implements PipeTransform {
  transform(value: any): boolean {
    return value.length !== 0;
  }
}
