import { Component, OnInit } from '@angular/core';

import { ExportService } from '../../services/export/export.service';
import { IExportItem } from '../../services/export/export.service';

@Component({
  selector: 'app-cart',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  public items: IExportItem = [];
  public selectedItemsId: number[] = [];

  public isAllChecked: boolean = false;

  constructor(private exportService: ExportService) {}
  ngOnInit(): void {
    this.items = this.exportService.getItems();
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

  removeFromExport(): void {
    for (const id of this.selectedItemsId) {
      this.exportService.removeItem(id);
    }
    this.selectedItemsId = [];
  }
}
