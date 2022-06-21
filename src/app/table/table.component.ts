import { Component, OnInit } from '@angular/core';

import { ItemsService } from './../services/items/items.service';
import { CartService } from '../services/cart/cart.service';
import { ExportService } from './../services/export/export.service';

import { Item } from '../items';

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
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }

  addToCart(item: Item): void {
    this.cartService.addItem(item);
  }
  addToExport(item: Item): void {
    this.exportService.addItem(item);
  }
}
