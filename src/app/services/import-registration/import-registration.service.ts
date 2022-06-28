import { Injectable } from '@angular/core';

import { Item } from './../../items';

export interface IImportRegistrationElem {
  [id: number]: IImportRegistrationCont;
}

export interface IImportRegistrationCont {
  id: number;
  name: string;
  date: string;
  items: (Item & { orderedQuantity: number })[];
}

@Injectable({
  providedIn: 'root',
})
export class ImportRegistrationService {
  private items: IImportRegistrationElem = {};
  constructor() {}

  getItems(): IImportRegistrationElem {
    return this.items;
  }
  getItemsById(id: number): IImportRegistrationCont {
    return this.items[id];
  }
  addItem(item: IImportRegistrationCont): void {
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
