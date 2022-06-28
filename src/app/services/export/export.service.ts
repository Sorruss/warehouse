import { Injectable } from '@angular/core';
import { Item } from 'src/app/items';

export interface IExportItem {
  [id: number]: Item & { orderedQuantity: number };
}

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private items: IExportItem = {};

  constructor() {}
  addItem(item: Item, quantity: number): void {
    if (this.items.hasOwnProperty(item.id)) {
      this.items[item.id].orderedQuantity += quantity;
    } else {
      this.items[item.id] = { ...item, orderedQuantity: quantity };
    }
  }
  getItem(id: number): any {
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
