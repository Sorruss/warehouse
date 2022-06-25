import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../../items';
import { ItemsService } from '../../services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExportService } from 'src/app/services/export/export.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  public item!: Item;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemsService.getItem(id);
  }

  addToCart(quantity: string): void {
    this.cartService.addItem(this.item, Number(quantity));
    this.notificationService.createImportNotification(this.item.name, quantity);
  }
  addToExport(quantity: string): void {
    if (!this.checkBeforeCreate(this.item.quantity, Number(quantity))) {
      this.notificationService.createTooMuchNotification(
        this.item.name,
        quantity
      );
    } else {
      this.exportService.addItem(this.item, Number(quantity));
      this.notificationService.createExportNotification(
        this.item.name,
        quantity
      );
    }
  }
  checkBeforeCreate(quantity: number, exportQuantity: number): boolean {
    return !(exportQuantity > quantity);
  }
}
