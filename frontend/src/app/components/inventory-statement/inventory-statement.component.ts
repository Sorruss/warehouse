import { Component, OnInit } from '@angular/core';
import { Item } from '../../items';

import { ItemsService } from '../../services/items/items.service';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
})
export class InventoryStatementComponent implements OnInit {
  public items: Item[] = [];

  constructor(
    private itemsService: ItemsService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.items = this.itemsService.getItems();
    this.filterService.hideSearchBar();
  }
}
