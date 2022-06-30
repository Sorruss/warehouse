import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../items';
import { ItemsService } from '../../services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExportService } from 'src/app/services/export/export.service';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  public item!: Item;

  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private exportService: ExportService,
    private filterService: FilterService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemsService.getItemById(this.id);
    this.filterService.hideSearchBar();
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
  removeItem(): void {
    this.itemsService.delete(this.id);
    this.router.navigate(['/']);
    this.notificationService.createSuccessfullyDeletedNotification(
      this.item.name,
      true
    );
  }
}
