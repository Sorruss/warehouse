import { Injectable } from '@angular/core';

import { Item } from './../../items';

export interface IExportRegistrationElem {
  [id: number]: IExportRegistrationCont;
}

export interface IExportRegistrationCont {
  id: number;
  name: string;
  date: string;
  items: (Item & { orderedQuantity: number })[];
}

@Injectable({
  providedIn: 'root',
})
export class ExportRegistrationService {
  private items: IExportRegistrationElem = {};
  constructor() {}

  getItems(): IExportRegistrationElem {
    return this.items;
  }
  getItemsById(id: number): IExportRegistrationCont {
    return this.items[id];
  }
  addItem(item: IExportRegistrationCont): void {
    item.id = this.getRandomNumber();
    if (!item.name) {
      item.name = `Замовлення №${item.id}`;
    }
    this.items[item.id] = item;
  }
  removeItem(id: number): void {
    delete this.items[id];
  }
  getRandomNumber(min: number = 1001, max: number = 9999): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
