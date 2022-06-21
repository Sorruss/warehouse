import { Component, OnInit } from '@angular/core';
import { ExportService } from '../services/export/export.service';

import { Item } from '../items';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  public items: Item[] = [];

  public isAllChecked: boolean = false;
  public counter: number = 0;

  constructor(private exportService: ExportService) {}
  ngOnInit(): void {
    this.items = this.exportService.getItems();
  }

  chooseAll(): void {
    document.querySelectorAll('.checkbox').forEach((checkbox) => {
      this.check((checkbox as HTMLInputElement).checked, !this.isAllChecked);
      (checkbox as HTMLInputElement).checked = !this.isAllChecked;
    });
  }
  chooseOne(checked: boolean): void {
    if (checked) {
      this.counter++;
    } else {
      this.counter--;
    }
  }
  check(prev: boolean, curr: boolean): void {
    if (prev && curr) {
      ('do nothing');
    } else if (!prev && curr) {
      this.counter++;
    } else if (!prev && !curr) {
      ('do nothing');
    } else if (prev && !curr) {
      this.counter--;
    }
  }
}
