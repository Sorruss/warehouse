import { Injectable } from '@angular/core';
import { Item } from 'src/app/interfaces';

export interface ICartItem {
  [id: number]: Item & { orderedQuantity: number };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: ICartItem = {};

  constructor() {}
  addItem(item: Item, quantity: number): void {
    if (this.items.hasOwnProperty(item.id)) {
      this.items[item.id].orderedQuantity += quantity;
    } else {
      this.items[item.id] = { ...item, orderedQuantity: quantity };
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
}
