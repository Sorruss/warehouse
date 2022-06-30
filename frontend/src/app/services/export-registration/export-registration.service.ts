import { Injectable } from '@angular/core';

import { Item } from 'src/app/interfaces';

export interface IExportRegistrationElem {
  [id: number]: IExportRegistrationCont;
}

export interface IExportRegistrationCont {
  id: number;
  name: string;
  date: string;
  items: (Item & { orderedQuantity?: number })[];
}

@Injectable({
  providedIn: 'root',
})
export class ExportRegistrationService {
  private orders: IExportRegistrationElem = {};
  constructor() {}

  getOrders(): IExportRegistrationElem {
    return this.orders;
  }
  getOrderById(id: number): IExportRegistrationCont {
    return this.orders[id];
  }
  addOrder(item: IExportRegistrationCont): void {
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
