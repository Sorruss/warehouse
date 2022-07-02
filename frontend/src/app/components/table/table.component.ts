import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { CartService } from '../../services/cart/cart.service';
import { ExportService } from '../../services/export/export.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { fadeIn, fadeOut, slide2right } from 'src/app/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [fadeIn, fadeOut, slide2right],
})
export class TableComponent implements OnInit {
  public itemsLoaded: Promise<boolean> = Promise.resolve(false);

  public items: any;
  public nameToFilter: string = '';

  private user_id!: number;

  constructor(
    private itemsService: ItemsService,
    private cartService: CartService,
    private exportService: ExportService,
    private notificationService: NotificationService,
    private filterService: FilterService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();

    this.user_id = this.authService.getUserDetails().id;
  }

  retrieveItems() {
    this.itemsService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        console.log(data);
        this.itemsLoaded = Promise.resolve(true);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  refreshItems() {
    this.retrieveItems();
  }

  createCarttItem(item: any, quantity: string): void {
    this.cartService
      .create({
        item_id: item.id,
        owner_id: this.user_id,
        ordered_quantity: Number(quantity),
      })
      .subscribe(
        (response) => {
          console.log('response: ', response);
          this.notificationService.createExportNotification(
            item.item_name,
            quantity
          );
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  createExportItem(item: any, quantity: string): void {
    this.exportService
      .create({
        item_id: item.id,
        owner_id: this.user_id,
        ordered_quantity: Number(quantity),
      })
      .subscribe(
        (response) => {
          console.log('response: ', response);
          this.notificationService.createImportNotification(
            item.item_name,
            quantity
          );
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  addToCart(item: any, quantity: string): void {
    this.createCarttItem(item, quantity);
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
      this.createExportItem(item, quantity);
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
