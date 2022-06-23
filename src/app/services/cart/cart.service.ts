import { Injectable } from '@angular/core';
import { Item } from 'src/app/items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Item[] = [];

  constructor() {}
  addItem(item: Item, quantity: number): void {
    this.items.push({ ...item, quantity });
  }
  getItem(id: number): Item {
    return this.items.find((item) => item.id === id)!;
  }
  getItems(): Item[] {
    return this.items;
  }
  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
  clearItems(): void {
    this.items = [];
  }
}
