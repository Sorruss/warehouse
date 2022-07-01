import { Component, OnInit } from '@angular/core';

import { ExportService } from '../../services/export/export.service';
import { Item, IExportItem } from 'src/app/interfaces';

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
  public items: any = [];
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
    this.retrieveItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  retrieveItems(): void {
    this.exportService.getAll().subscribe({
      next: (data) => {
        console.log('data: ', data);
        this.items = data;
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
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

  deleteItem(id: number): void {
    this.exportService.delete(id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.retrieveItems();
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  removeFromExport(orderId = 0, add: boolean = false): void {
    if (add) {
      for (const id of this.selectedItemsId) {
        this.exportService.update(id, { export_order_id: orderId }).subscribe(
          (response) => {
            console.log('response: ', response);
          },
          (error) => {
            console.log('error: ', error);
          }
        );
      }
    } else {
      for (const id of this.selectedItemsId) {
        this.deleteItem(id);
      }
    }
    this.selectedItemsId = [];
  }

  getSelected(): (any & { orderedQuantity: number })[] {
    return this.items.filter((item: any) =>
      this.selectedItemsId.includes(item.id)
    );
  }

  changeModalDialogState(): void {
    this.goingToOrder = !this.goingToOrder;
  }
  checkOnWrongQuantity(): boolean {
    for (let item of this.items) {
      if (this.selectedItemsId.includes(item.id)) {
        if (item.ordered_quantity <= 0) {
          this.notificationService.createWrongQuantityNotification(
            item.name,
            String(item.ordered_quantity)
          );
          this.changeModalDialogState();
          return false;
        }
      }
    }
    return true;
  }
  checkOnSelected(): boolean {
    const result = this.selectedItemsId.length !== 0;

    if (!result) {
      this.notificationService.createNoSelectedNotification(true);
      this.changeModalDialogState();
    }

    return result;
  }
  makeAnOrder(order_name: string = ''): void {
    if (!this.checkOnWrongQuantity() || !this.checkOnSelected()) {
      return;
    }

    let id;
    this.exportRegistrationService
      .create({
        order_name,
        owner_id: 1,
        income_date: new Date().toDateString(),
      })
      .subscribe(
        (response) => {
          console.log('response', response);
          id = response.id;
        },
        (error) => {
          console.log('error', error);
        }
      );
    this.removeFromExport(id, true);
    this.changeModalDialogState();
    this.notificationService.createOrderNotification(order_name, true);
  }
}
