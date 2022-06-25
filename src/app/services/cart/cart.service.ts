import { Injectable } from '@angular/core';
import { Item } from 'src/app/items';

export interface ICartItem {
  [id: number]: Item;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: ICartItem = [];

  constructor() {}
  addItem(item: Item, quantity: number): void {
    if (this.items.hasOwnProperty(item.id)) {
      this.items[item.id].quantity += quantity;
    } else {
      this.items[item.id] = { ...item, quantity };
    }
  }
  getItem(id: number): Item {
    return this.items[id]!;
  }
  getItems(): ICartItem {
    return this.items;
  }
  removeItem(id: number): void {
    delete this.items[id];
  }
  clearItems(): void {
    this.items = [];
  }
}
