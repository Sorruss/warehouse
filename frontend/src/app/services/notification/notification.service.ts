import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';

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

  private notficationsLimit: number = 8;
  private msecondsToDisappear: number = 3000;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  addItem(obj: {
    title: string;
    message: string;
    color: string;
    compressed: boolean;
  }): void {
    const id = this.items.length ? this.items[this.items.length - 1].id + 1 : 0;
    const item: Notification = { id, ...obj };
    if (this.items.length >= this.notficationsLimit) {
      this.items.shift();
    }
    this.items.push(item);
    this.changed();

    if (this.cookieService.check('notificationTime')) {
      let time: any = this.cookieService.get('notificationTime');
      if (time !== 'never') {
        time = Number(time);
        this.autoDelete(item.id, time);
      }
    } else {
      this.autoDelete(item.id, this.msecondsToDisappear);
    }
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
  autoDelete(id: number, mseconds: number): void {
    setTimeout(() => this.removeItem(id), mseconds);
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
      title: 'Замовлення' + (name ? ` '${name}' ` : ' ') + 'створене',
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
      color: 'totalred',
      compressed,
    });
  }
  createSuccessfullyDeletedNotification(
    name: string,
    compressed: boolean = false
  ): void {
    this.addItem({
      title: `Запис '${name.toUpperCase()}' був успішно видалений.`,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createSuccessLogInNotification(compressed: boolean = false): void {
    const user = this.authService.getUserDetails();
    const name = user.first_name + ' ' + user.last_name;
    this.addItem({
      title: `Ви увійшли в систему як ${name}`,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createDOCXFileCreatedNotification(compressed: boolean = false): void {
    this.addItem({
      title: `Звіт був успішно сформований`,
      message: '',
      color: 'totalgreen',
      compressed,
    });
  }
  createNoChooseNotification(compressed: boolean = false): void {
    this.addItem({
      title: `Ви нічого не обрали`,
      message: '',
      color: 'totalred',
      compressed,
    });
  }
  createSomethingWasCreatedNotification(
    name1: string,
    name2: string,
    compressed: boolean = false
  ): void {
    this.addItem({
      title: `Успіх`,
      message: `${name1} '${name2}' був успішно створений`,
      color: 'green',
      compressed,
    });
  }
  createSmthWasChangedNotification(
    name1: string,
    name2: string,
    compressed: boolean = true
  ): void {
    this.addItem({
      title: `${name1} було успішно змінено на '${name2}'`,
      message: '',
      color: 'green',
      compressed,
    });
  }
}
