import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], q: string): any[] {
    if (!items) {
      return [];
    }
    if (!q) {
      return items;
    }
    q = q.toLocaleLowerCase();

    return items.filter((it) => {
      return it.name.toLocaleLowerCase().startsWith(q);
    });
  }
}
