import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public items: any;
  constructor() {}
  ngOnInit(): void {
    this.items = [
      { name: 'ноутбук', quantity: 213, date: '21.01.2022' },
      { name: 'книжка', quantity: 123, date: '24.06.2022' },
      { name: 'телефон', quantity: 1233, date: '25.08.2022' },
    ];
  }
}
