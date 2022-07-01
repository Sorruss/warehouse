import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';
import { Item, ICartItem } from 'src/app/interfaces';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ImportRegistrationService } from 'src/app/services/import-registration/import-registration.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { fadeIn, slide2right } from 'src/app/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [fadeIn, slide2right],
})
export class CartComponent implements OnInit {
  public items: any = {};
  public selectedItemsId: number[] = [];

  public isAllChecked: boolean = false;
  public goingToOrder: boolean = false;
  public nameToFilter: string = '';

  constructor(
    private cartService: CartService,
    private filterService: FilterService,
    private importRegistrationService: ImportRegistrationService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  retrieveItems(): void {
    this.cartService.getAll().subscribe({
      next: (data) => {
        console.log('data: ', data);
        this.items = data;
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }

  chooseOne(checked: boolean, id: number): void {
    if (checked) {
      this.selectedItemsId.push(id);
    } else {
      this.selectedItemsId = this.selectedItemsId.filter((i) => i !== id);
    }
  }
  chooseAll(): void {
    document.querySelectorAll('.checkbox').forEach((checkbox) => {
      this.check(
        (checkbox as HTMLInputElement).checked,
        !this.isAllChecked,
        Number(checkbox.id)
      );
      (checkbox as HTMLInputElement).checked = !this.isAllChecked;
    });
  }
  check(prev: boolean, curr: boolean, id: number): void {
    if (prev && curr) {
      ('do nothing');
    } else if (!prev && curr) {
      this.selectedItemsId.push(id);
    } else if (!prev && !curr) {
      ('do nothing');
    } else if (prev && !curr) {
      this.selectedItemsId = this.selectedItemsId.filter((i) => i !== id);
    }
  }

  deleteItem(id: number): void {
    this.cartService.delete(id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.retrieveItems();
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  removeFromCart(): void {
    for (let id of this.selectedItemsId) {
      this.deleteItem(id);
    }
    this.selectedItemsId = [];
  }

  getSelected(): (any & { orderedQuantity: number })[] {
    const selected = [];

    for (let item of this.items) {
      if (this.selectedItemsId.includes(item.id)) {
        selected.push(item);
      }
    }

    return selected;
  }

  changeModalDialogState(): void {
    this.goingToOrder = !this.goingToOrder;
  }

  checkOnWrongQuantity(): boolean {
    for (let item of this.items) {
      if (this.selectedItemsId.includes(item.id)) {
        if (item.ordered_quantity <= 0) {
          this.notificationService.createWrongQuantityNotification(
            item.name,
            String(item.ordered_quantity)
          );
          this.changeModalDialogState();
          return false;
        }
      }
    }
    return true;
  }
  checkOnSelected(): boolean {
    const result = this.selectedItemsId.length !== 0;

    if (!result) {
      this.notificationService.createNoSelectedNotification(true);
      this.changeModalDialogState();
    }

    return result;
  }
  makeAnOrder(order_name: string = ''): void {
    if (!this.checkOnWrongQuantity() || !this.checkOnSelected()) {
      return;
    }

    this.importRegistrationService
      .create({
        order_name,
        income_date: new Date().toDateString(),
      })
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    this.removeFromCart();
    this.changeModalDialogState();
    this.notificationService.createOrderNotification(order_name, true);
  }

  changeOrderQuantity(
    item: any & { orderedQuantity: number },
    value: string
  ): void {
    item.orderedQuantity = Number(value);
  }
}
