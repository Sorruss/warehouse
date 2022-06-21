import { Component, OnInit } from '@angular/core';
import { Item, items } from '../items';

import { ItemsService } from './../services/items/items.service';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
})
export class InventoryStatementComponent implements OnInit {
  public items: Item[] = [];

  constructor(private itemsService: ItemsService) {}
  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }
}
