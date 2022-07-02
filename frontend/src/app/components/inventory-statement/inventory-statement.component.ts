import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
})
export class InventoryStatementComponent implements OnInit {
  public items: any[] = [];

  constructor(
    private itemsService: ItemsService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();
    this.filterService.hideSearchBar();
  }

  retrieveItems(): void {
    this.itemsService.getAll().subscribe(
      (data) => {
        this.items = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadDOCX(): void {}
}
