import { Component, OnInit } from '@angular/core';

import { Item } from 'src/app/items';

import { ExportService } from '../../services/export/export.service';
import { IExportItem } from '../../services/export/export.service';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ExportRegistrationService } from 'src/app/services/export-registration/export-registration.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { fadeIn, slide2right } from 'src/app/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
  animations: [fadeIn, slide2right],
})
export class ExportComponent implements OnInit {
  public items: IExportItem = {};
  public selectedItemsId: number[] = [];

  public isAllChecked: boolean = false;
  public goingToOrder: boolean = false;
  public nameToFilter: string = '';

  constructor(
    private exportService: ExportService,
    private filterService: FilterService,
    private exportRegistrationService: ExportRegistrationService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.items = this.exportService.getItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
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

  getValues(): (Item & { orderedQuantity: number })[] {
    return Object.values(this.items);
  }
  getSelected(): (Item & { orderedQuantity: number })[] {
    return this.getValues().filter((item) =>
      this.selectedItemsId.includes(item.id)
    );
  }

  changeModalDialogState(): void {
    this.goingToOrder = !this.goingToOrder;
  }

  makeAnOrder(name: string = ''): void {
    this.exportRegistrationService.addItem({
      id: 0,
      name,
      date: new Date().toDateString(),
      items: this.getSelected(),
    });
    this.removeFromExport();
    this.changeModalDialogState();
    this.notificationService.createOrderNotification(name, true);
  }
}
