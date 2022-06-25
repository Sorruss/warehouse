import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';
import { ICartItem } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: ICartItem = [];
  public selectedItemsId: number[] = [];

  public isAllChecked: boolean = false;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.items = this.cartService.getItems();
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
    for (const id of this.selectedItemsId) {
      this.cartService.removeItem(id);
    }
    this.selectedItemsId = [];
  }
}
