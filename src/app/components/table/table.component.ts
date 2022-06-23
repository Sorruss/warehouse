import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { CartService } from '../../services/cart/cart.service';
import { ExportService } from '../../services/export/export.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { Item } from '../../items';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public items: any;

  constructor(
    private itemsService: ItemsService,
    private cartService: CartService,
    private exportService: ExportService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }

  addToCart(item: Item, quantity: string): void {
    this.cartService.addItem(item, Number(quantity));
    this.createNotification('import', item.name, quantity);
  }
  addToExport(item: Item, quantity: string): void {
    if (!this.checkBeforeCreate(item.quantity, Number(quantity))) {
      this.createNotification('too-much-for-export', item.name, quantity);
    } else {
      this.exportService.addItem(item, Number(quantity));
      this.createNotification('export', item.name, quantity);
    }
  }

  createNotification(type: string, name: string, exportQuantity: string): void {
    if (type === 'export') {
      this.notificationService.addItem({
        title: 'Додано до замовлення на експорт',
        message: `Товар "${name.toLocaleUpperCase()}" у кількості ${exportQuantity} був доданий до загального експорту`,
        color: 'dark',
      });
    } else if (type === 'import') {
      this.notificationService.addItem({
        title: 'Додано до замовлення на імпорт',
        message: `Товар "${name.toLocaleUpperCase()}" у кількості ${exportQuantity} був доданий до загального імпорту`,
        color: 'dark',
      });
    } else if (type === 'too-much-for-export') {
      this.notificationService.addItem({
        title: 'Занадто багато',
        message: `Товар "${name.toLocaleUpperCase()}" у кількості ${exportQuantity} не може бути вивезений. Такої кількості немає`,
        color: 'red',
      });
    }
  }
  checkBeforeCreate(quantity: number, exportQuantity: number): boolean {
    return !(exportQuantity > quantity);
  }

  toggleClass2Active(inputElem: any): void {
    inputElem.value > 0
      ? inputElem.classList.add('active')
      : inputElem.classList.remove('active');
  }
}
