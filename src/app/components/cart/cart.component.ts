import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';
import { ICartItem } from '../../services/cart/cart.service';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ImportRegistrationService } from 'src/app/services/import-registration/import-registration.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { Item } from 'src/app/items';

import { fadeIn, slide2right } from 'src/app/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [fadeIn, slide2right],
})
export class CartComponent implements OnInit {
  public items: ICartItem = {};
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
    this.items = this.cartService.getItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
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

  removeFromCart(): void {
    for (let id of this.selectedItemsId) {
      this.cartService.removeItem(id);
    }
    this.selectedItemsId = [];
  }

  getValues(): (Item & { orderedQuantity: number })[] {
    return Object.values(this.items);
  }

  changeModalDialogState(): void {
    this.goingToOrder = !this.goingToOrder;
  }

  makeAnOrder(name: string = ''): void {
    this.importRegistrationService.addItem({
      id: 0,
      name,
      date: new Date().toDateString(),
      items: this.getValues(),
    });
    this.removeFromCart();
    this.changeModalDialogState();
    this.notificationService.createOrderNotification(name, true);
  }
}
