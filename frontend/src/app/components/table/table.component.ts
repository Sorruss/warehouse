import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { CartService } from '../../services/cart/cart.service';
import { ExportService } from '../../services/export/export.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ObservablesService } from 'src/app/services/observables/observables.service';

import { fadeIn, fadeOut, slide2right } from 'src/app/animations/animations';

import { Item } from 'src/app/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [fadeIn, fadeOut, slide2right],
})
export class TableComponent implements OnInit {
  public itemsLoaded: Promise<boolean> = Promise.resolve(false);

  public items: Item[] = [];
  public nameToFilter: string = '';

  private user_id!: number;

  constructor(
    private itemsService: ItemsService,
    private cartService: CartService,
    private exportService: ExportService,
    private notificationService: NotificationService,
    private filterService: FilterService,
    private authService: AuthService,
    private observablesService: ObservablesService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();

    this.user_id = this.authService.getUserDetails().id;

    this.observablesService.isNewItemObs.subscribe((value) => {
      this.retrieveItems();
    });
  }

  retrieveItems(): void {
    this.itemsService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        console.log('data: ', data);
        this.itemsLoaded = Promise.resolve(true);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
  refreshItems() {
    this.retrieveItems();
  }

  createCartItem(item: any, quantity: string): void {
    this.cartService
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
  addToCart(item: any, quantity: string): void {
    this.createCartItem(item, quantity);
  }
  addToExport(item: any): void {
    const quantity = (
      document.querySelector(
        `#quantityInputExport${item.id}`
      ) as HTMLInputElement
    ).value;

    if (!this.checkBeforeCreate(item.quantity, Number(quantity))) {
      this.notificationService.createTooMuchNotification(
        item.item_name,
        quantity
      );
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
