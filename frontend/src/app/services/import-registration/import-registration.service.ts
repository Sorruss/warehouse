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
  private orders: IImportRegistrationElem = {};
  constructor() {}

  getOrders(): IImportRegistrationElem {
    return this.orders;
  }
  getOrderById(id: number): IImportRegistrationCont {
    return this.orders[id];
  }
  addOrder(item: IImportRegistrationCont): void {
    item.id = this.getRandomNumber();
    if (!item.name) {
      item.name = `Замовлення №${item.id}`;
    }
    this.orders[item.id] = item;
  }
  removeOrder(id: number): void {
    delete this.orders[id];
  }
  getRandomNumber(min: number = 1001, max: number = 9999): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
