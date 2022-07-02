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

    let prop: string = '';
    for (let p of Object.keys(items[0])) {
      if (p.includes('name')) {
        prop = p;
      }
    }

    if (!prop) {
      return items.filter((it) => {
        return it.Item.item_name.toLocaleLowerCase().startsWith(q);
      });
    }

    return items.filter((it) => {
      return it[prop].toLocaleLowerCase().startsWith(q);
    });
  }
}
