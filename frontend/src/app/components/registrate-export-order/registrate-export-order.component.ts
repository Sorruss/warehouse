import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ItemsService } from 'src/app/services/items/items.service';

import { fadeIn, slide2right } from 'src/app/animations';

import { IExportRegistrationCont } from 'src/app/interfaces';

import { ExportRegistrationService } from 'src/app/services/export-registration/export-registration.service';

@Component({
  selector: 'app-registrate-export-order',
  templateUrl: './registrate-export-order.component.html',
  styleUrls: ['./registrate-export-order.component.css'],
  animations: [fadeIn, slide2right],
})
export class RegistrateExportOrderComponent implements OnInit {
  public order!: any;
  public nameToFilter: string = '';

  private id!: number;

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveOrder();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  retrieveOrder(): void {
    this.exportRegistrationService.get(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.order = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeItemsQuantity(): void {
    for (let item of this.order.items) {
      item.quantity += item.orderedQuantity!;
      delete item.orderedQuantity;
      this.itemsService.update(item.id, item);
    }
  }
  deleteOrder(): void {
    this.exportRegistrationService.delete(this.id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  registerExport(): void {
    // this.changeItemsQuantity();
    this.deleteOrder();
  }
}
