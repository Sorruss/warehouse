import { Injectable } from '@angular/core';

import { Item, items } from '../../items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsUrl = 'api/items';

  constructor() {}
  getItem(id: number): Item {
    return items.find((item) => item.id === id)!;
  }
  getItems(): Item[] {
    return items;
  }
  searchItems(q: string): Item[] {
    if (!q.trim()) {
      return [];
    }
    return items.filter((item) => item.name.includes(q));
  }
}
