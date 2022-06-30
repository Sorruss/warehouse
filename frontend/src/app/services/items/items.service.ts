import { Injectable } from '@angular/core';

import { Item, items } from '../../items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor() {}

  getItemById(id: number): Item {
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
  update(id: number, item: Item): void {
    items[items.findIndex((item) => item.id === id)] = item;
  }
  delete(id: number): void {
    // delete items[items.findIndex((item) => item.id === id)];
  }
}
