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
    this.notificationService.createImportNotification(item.name, quantity);
  }
  addToExport(item: Item, quantity: string): void {
    if (!this.checkBeforeCreate(item.quantity, Number(quantity))) {
      this.notificationService.createTooMuchNotification(item.name, quantity);
    } else {
      this.exportService.addItem(item, Number(quantity));
      this.notificationService.createExportNotification(item.name, quantity);
    }
  }
  checkBeforeCreate(quantity: number, exportQuantity: number): boolean {
    return !(exportQuantity > quantity);
  }

  toggleClass2Active(inputElem: any): void {
    const inputDiv = inputElem.parentElement;

    inputElem.value > 0
      ? inputDiv.classList.add('active')
      : inputDiv.classList.remove('active');
  }
}
