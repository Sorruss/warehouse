import { Injectable } from '@angular/core';
import { Item } from 'src/app/items';

export interface IExportItem {
  [id: number]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private items: IExportItem = [];

  constructor() {}
  addItem(item: Item, quantity: number): void {
    if (this.items.hasOwnProperty(item.id)) {
      this.items[item.id].quantity += quantity;
    } else {
      this.items[item.id] = { ...item, quantity, totalQuantity: item.quantity };
    }
  }
  getItem(id: number): Item {
    return this.items[id]!;
  }
  getItems(): IExportItem {
    return this.items;
  }
  removeItem(id: number): void {
    delete this.items[id];
  }
  clearItems(): void {
    this.items = [];
  }
}
