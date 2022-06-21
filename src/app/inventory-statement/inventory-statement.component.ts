import { Component, OnInit } from '@angular/core';
import { Item, items } from '../items';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
})
export class InventoryStatementComponent implements OnInit {
  public items: Item[] = items;

  constructor() {}
  ngOnInit(): void {}
}
