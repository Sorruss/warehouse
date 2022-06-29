import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  color: string;
  compressed: boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public items: Notification[] = [];
  itemsChanged: Subject<Notification[]> = new Subject<Notification[]>();

  constructor() {}
  addItem(obj: {
    title: string;
    message: string;
    color: string;
    compressed: boolean;
  }): void {
    const id = this.items.length ? this.items[this.items.length - 1].id + 1 : 0;
    const item: Notification = { id, ...obj };
    this.items.push(item);
    this.changed();
    this.autoDelete(item.id, 3);
  }
  getItem(id: number): Notification {
    return this.items.find((item) => item.id === id)!;
  }
  getItems(): Notification[] {
    return this.items;
  }
  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.changed();
  }
  clearItems(): void {
    this.items = [];
    this.changed();
  }

  changed() {
    this.itemsChanged.next(this.items);
  }
  autoDelete(id: number, seconds: number): void {
    setTimeout(() => this.removeItem(id), seconds * 1000);
    this.changed();
  }

  createImportNotification(
    name: string,
    exportQuantity: string,
    compressed: boolean = false
  ): void {
    this.addItem({
      title: 'Додано до замовлення на імпорт',
      message: `Товар "${name.toLocaleUpperCase()}" у кількості ${
        exportQuantity || '0'
      } був доданий до загального імпорту`,
      color: 'dark',
      compressed,
    });
  }
  createExportNotification(
    name: string,
    exportQuantity: string,
    compressed: boolean = false
  ): void {
    this.addItem({
      title: 'Додано до замовлення на експорт',
      message: `Товар "${name.toLocaleUpperCase()}" у кількості ${
        exportQuantity || 0
      } був доданий до загального експорту`,
      color: 'dark',
      compressed,
    });
  }
  createTooMuchNotification(
    name: string,
    exportQuantity: string,
    compressed: boolean = false
  ): void {
    this.addItem({
      title: 'Занадто багато',
      message: `Товар "${name.toLocaleUpperCase()}" у кількості ${
        exportQuantity || 0
      } не може бути вивезений. Такої кількості немає`,
      color: 'red',
      compressed,
    });
  }
  createOrderNotification(name: string, compressed: boolean = false): void {
    this.addItem({
      title: `Замовлення ${name} створене`,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createWrongQuantityNotification(
    name: string,
    quantity: string,
    compressed: boolean = false
  ): void {
    this.addItem({
      title: 'Не корректна кількість товару',
      message: `Товар "${name.toLocaleUpperCase()}" у кількості ${
        quantity || 0
      } не може бути доданий до замовлення.`,
      color: 'red',
      compressed,
    });
  }
  createNoSelectedNotification(compressed: boolean = false): void {
    this.addItem({
      title: 'Неможливість створення пустого замовлення',
      message: '',
      color: 'red',
      compressed,
    });
  }
  createInvalidCredentialsNotification(compressed: boolean = false): void {
    this.addItem({
      title: 'Невірні дані. Перевірте та спробуйте знову',
      message: '',
      color: 'red',
      compressed,
    });
  }
}
