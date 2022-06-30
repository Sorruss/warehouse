import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item, items } from '../../items';

const backUrl = 'http://localhost:8080/api/items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private httpClient: HttpClient) {}

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
