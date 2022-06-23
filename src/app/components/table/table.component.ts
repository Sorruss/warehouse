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

  addToCart(item: Item): void {
    this.cartService.addItem(item);
  }
  addToExport(item: Item): void {
    this.exportService.addItem(item);
  }

  createNotification(type: string, name: string, quantity: string): void {
    if (type === 'export') {
      this.notificationService.addItem({
        title: 'Додано до замовлення на експорт',
        message: `Товар "${name.toLocaleUpperCase()}" у кількості ${quantity} був доданий до загального експорту`,
        color: 'dark',
      });
    } else if (type === 'import') {
      this.notificationService.addItem({
        title: 'Додано до замовлення на імпорт',
        message: `Товар "${name.toLocaleUpperCase()}" у кількості ${quantity} був доданий до загального імпорту`,
        color: 'dark',
      });
    }
  }

  toggleClass2Active(inputElem: any): void {
    inputElem.value > 0
      ? inputElem.classList.add('active')
      : inputElem.classList.remove('active');
  }
}
