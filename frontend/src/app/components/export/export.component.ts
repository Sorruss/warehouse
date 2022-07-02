import { Component, OnInit } from '@angular/core';

import { ExportService } from '../../services/export/export.service';
import { Item, IExportItem } from 'src/app/interfaces';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ExportRegistrationService } from 'src/app/services/export-registration/export-registration.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { RegistrateModelService } from 'src/app/services/registrate-model/registrate-model.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { fadeIn, slide2right } from 'src/app/animations/animations';

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

  private user_id!: number;

  constructor(
    private exportService: ExportService,
    private filterService: FilterService,
    private exportRegistrationService: ExportRegistrationService,
    private notificationService: NotificationService,
    private registrateModelService: RegistrateModelService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();

    this.user_id = this.authService.getUserDetails().id;
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
  createRModel(item: any, savedOrderId: number): void {
    item = {
      ritem_name: item.Item.item_name,
      ordered_quantity: item.ordered_quantity,
      ritem_id: item.Item.id,
      ritem_quantity: item.Item.quantity,
      export_order_id: savedOrderId,
    };

    console.log('item: ', item);
    this.registrateModelService.create(item).subscribe(
      (response) => {
        console.log('response', response);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  removeFromExport(add: boolean = false, savedOrderId?: number): void {
    if (!this.selectedItemsId.length) {
      this.notificationService.createNoChooseNotification(true);
      return;
    }

    if (add) {
      let item;
      for (const id of this.selectedItemsId) {
        item = this.items.find((i: any) => i.id === id);

        this.deleteItem(id);
        this.createRModel(item, savedOrderId!);
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

    this.createAnOrder(order_name);
  }
  createAnOrder(order_name: string): void {
    this.exportRegistrationService
      .create({
        order_name,
        owner_id: this.user_id,
      })
      .subscribe(
        (response) => {
          console.log('response', response);
          this.removeFromExport(true, response.id);
          this.changeModalDialogState();
          this.notificationService.createOrderNotification(order_name, true);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
}
