import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { CartService } from '../../services/cart/cart.service';
import { ExportService } from '../../services/export/export.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, fadeOut, slide2right } from 'src/app/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [fadeIn, fadeOut, slide2right],
})
export class TableComponent implements OnInit {
  public items: any;
  public nameToFilter: string = '';

  constructor(
    private itemsService: ItemsService,
    private cartService: CartService,
    private exportService: ExportService,
    private notificationService: NotificationService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  retrieveItems() {
    this.itemsService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  refreshItems() {
    this.retrieveItems();
  }

  addToCart(item: any, quantity: string): void {
    this.cartService.addItem(item, Number(quantity));
    this.notificationService.createImportNotification(item.name, quantity);
  }
  addToExport(item: any): void {
    const quantity = (
      document.querySelector(
        `#quantityInputExport${item.id}`
      ) as HTMLInputElement
    ).value;

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
