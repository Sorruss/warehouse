import { Component, OnInit } from '@angular/core';

import { ItemsService } from './../services/items/items.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public items: any;

  constructor(
    private itemsService: ItemsService
  ) // private cartService: CartService
  {}
  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }
  seeDetails(name: string): void {
    // this.cartService.test = name;
  }
}
