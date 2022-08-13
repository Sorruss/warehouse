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
  public itemsChanged: Subject<Notification[]> = new Subject<Notification[]>();

  private notficationsLimit: number = 8;
  private msecondsToDisappear: number = 3000;
  private currLang: string = '';

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

    // IF NOTIFICATION TIME WAS CHANGED BY THE USER.
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

  checkOnLanguageChange(): void {
    // IF SITE LANGUAGE WAS CHANGED BY THE USER.
    if (this.cookieService.check('language')) {
      this.currLang = this.cookieService.get('language');
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
    let message: string = '';
    let title: string = '';

    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Додано до замовлення на імпорт';
      message = `Товар "${name.toLocaleUpperCase()}" у кількості ${
        exportQuantity || '0'
      } був доданий до загального імпорту`;
    } else if (this.currLang === 'en') {
      title = 'Added to the total import';
      message = `Product "${name.toLocaleUpperCase()}" in quantity ${
        exportQuantity || '0'
      } has been added to the total import`;
    } else if (this.currLang === 'pl') {
      title = 'Dodano do całkowitego importu';
      message = `Produkt "${name.toLocaleUpperCase()}" w ilości ${
        exportQuantity || '0'
      } został dodany do całkowitego importu`;
    }

    this.addItem({
      title,
      message,
      color: 'dark',
      compressed,
    });
  }
  createExportNotification(
    name: string,
    exportQuantity: string,
    compressed: boolean = false
  ): void {
    let message: string = '';
    let title: string = '';

    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Додано до замовлення на експорт';
      message = `Товар "${name.toLocaleUpperCase()}" у кількості ${
        exportQuantity || 0
      } був доданий до загального експорту`;
    } else if (this.currLang === 'en') {
      title = 'Added to the total export';
      message = `Product "${name.toLocaleUpperCase()}" in quantity ${
        exportQuantity || '0'
      } has been added to the total export`;
    } else if (this.currLang === 'pl') {
      title = 'Dodano do całkowitego importu';
      message = `Produkt "${name.toLocaleUpperCase()}" w ilości ${
        exportQuantity || '0'
      } został dodany do całkowitego eksportu`;
    }

    this.addItem({
      title,
      message,
      color: 'dark',
      compressed,
    });
  }
  createTooMuchNotification(
    name: string,
    exportQuantity: string,
    compressed: boolean = false
  ): void {
    let message: string = '';
    let title: string = '';

    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Занадто багато';
      message = `Товар "${name.toLocaleUpperCase()}" у кількості ${
        exportQuantity || 0
      } не може бути вивезений. Такої кількості немає`;
    } else if (this.currLang === 'en') {
      title = 'Too much';
      message = `Product "${name.toLocaleUpperCase()}" in quantity ${
        exportQuantity || '0'
      } cannot be exported. There is no such quantity`;
    } else if (this.currLang === 'pl') {
      title = 'Zbyt wiele';
      message = `Produkt "${name.toLocaleUpperCase()}" w ilości ${
        exportQuantity || '0'
      } nie można wyeksportować. Nie ma takiej ilości`;
    }

    this.addItem({
      title,
      message,
      color: 'red',
      compressed,
    });
  }
  createOrderNotification(name: string, compressed: boolean = false): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Замовлення' + (name ? ` '${name}' ` : ' ') + 'було створене';
    } else if (this.currLang === 'en') {
      title = 'Order' + (name ? ` '${name}' ` : ' ') + 'has been created';
    } else if (this.currLang === 'pl') {
      title = 'Utworzono zamówienie ' + (name ? name : '');
    }

    this.addItem({
      title,
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
    let message: string = '';
    let title: string = '';

    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Некоректна кількість товару';
      message = `Товар "${name.toLocaleUpperCase()}" у кількості ${
        quantity || 0
      } не може бути доданий до замовлення.`;
    } else if (this.currLang === 'en') {
      title = 'Incorrect product quantity';
      message = `Product "${name.toLocaleUpperCase()}" in quantity ${
        quantity || '0'
      } cannot be added to the order.`;
    } else if (this.currLang === 'pl') {
      title = 'Nieprawidłowa ilość produktu';
      message = `Produktu "${name.toLocaleUpperCase()}" w ilości ${
        quantity || '0'
      } nie można dodać do zamówienia.`;
    }

    this.addItem({
      title,
      message,
      color: 'red',
      compressed,
    });
  }
  createNoSelectedNotification(compressed: boolean = false): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Неможливість створення пустого замовлення';
    } else if (this.currLang === 'en') {
      title = 'It is impossible to create an empty order';
    } else if (this.currLang === 'pl') {
      title = 'Nie da się stworzyć pustego zamówienia';
    }

    this.addItem({
      title,
      message: '',
      color: 'red',
      compressed,
    });
  }
  createInvalidCredentialsNotification(compressed: boolean = false): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Невірні дані. Перевірте та спробуйте знову';
    } else if (this.currLang === 'en') {
      title = 'Incorrect data. Check and try again';
    } else if (this.currLang === 'pl') {
      title = 'Nieprawidłowe dane. Sprawdź i spróbuj ponownie';
    }

    this.addItem({
      title,
      message: '',
      color: 'totalred',
      compressed,
    });
  }
  createSuccessfullyDeletedNotification(
    name: string,
    compressed: boolean = false
  ): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = `Запис '${name.toUpperCase()}' був успішно видалений`;
    } else if (this.currLang === 'en') {
      title = `Record '${name.toUpperCase()}' was successfully deleted`;
    } else if (this.currLang === 'pl') {
      title = `Rekord '${name.toUpperCase()}' został pomyślnie usunięty`;
    }

    this.addItem({
      title,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createSuccessLogInNotification(compressed: boolean = false): void {
    const user = this.authService.getUserDetails();
    const fullname = user.first_name + ' ' + user.last_name;

    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = `Ви увійшли в систему як ${fullname}`;
    } else if (this.currLang === 'en') {
      title = `You are logged in as ${fullname}`;
    } else if (this.currLang === 'pl') {
      title = `Jesteś zalogowany jako ${fullname}`;
    }

    this.addItem({
      title,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createDOCXFileCreatedNotification(compressed: boolean = false): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Звіт був успішно сформований';
    } else if (this.currLang === 'en') {
      title = 'The report was generated successfully';
    } else if (this.currLang === 'pl') {
      title = 'Raport został wygenerowany pomyślnie';
    }

    this.addItem({
      title,
      message: '',
      color: 'totalgreen',
      compressed,
    });
  }
  createNoChooseNotification(compressed: boolean = false): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Ви нічого не обрали';
    } else if (this.currLang === 'en') {
      title = 'You have not selected anything';
    } else if (this.currLang === 'pl') {
      title = 'Niczego nie wybrałeś';
    }

    this.addItem({
      title,
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
    let message: string = '';
    let title: string = '';

    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Успіх';
      message = `${name1} '${name2}' був успішно створений`;
    } else if (this.currLang === 'en') {
      title = 'Success';
      message = `${name1} '${name2}' was successfully created`;
    } else if (this.currLang === 'pl') {
      title = 'Powodzenie';
      message = `${name1} '${name2}' został pomyślnie utworzony`;
    }

    this.addItem({
      title,
      message,
      color: 'green',
      compressed,
    });
  }
  createSmthWasChangedNotification(
    name1: string,
    name2: string,
    compressed: boolean = true
  ): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = `${name1} було успішно змінено на '${name2}'`;
    } else if (this.currLang === 'en') {
      title = `${name1} was successfully changed to '${name2}'`;
    } else if (this.currLang === 'pl') {
      title = `${name1} został pomyślnie zmieniony na '${name2}'`;
    }

    this.addItem({
      title,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createSuccessNotification(compressed: boolean = true): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Успіх';
    } else if (this.currLang === 'en') {
      title = 'Success';
    } else if (this.currLang === 'pl') {
      title = 'Powodzenie';
    }

    this.addItem({
      title,
      message: '',
      color: 'green',
      compressed,
    });
  }
  createPasswordsDoNotMatchNotification(compressed: boolean = true): void {
    let title: string = '';
    this.checkOnLanguageChange();
    if (this.currLang === 'ua' || !this.currLang) {
      title = 'Паролі не співпадають';
    } else if (this.currLang === 'en') {
      title = 'Passwords do not match';
    } else if (this.currLang === 'pl') {
      title = 'Hasła nie pasują do siebie';
    }

    this.addItem({
      title,
      message: '',
      color: 'red',
      compressed,
    });
  }
}
