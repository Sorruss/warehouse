import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ItemsService } from 'src/app/services/items/items.service';

import { fadeIn, slide2right } from 'src/app/animations';

import {
  ExportRegistrationService,
  IExportRegistrationCont,
} from 'src/app/services/export-registration/export-registration.service';

@Component({
  selector: 'app-registrate-export-order',
  templateUrl: './registrate-export-order.component.html',
  styleUrls: ['./registrate-export-order.component.css'],
  animations: [fadeIn, slide2right],
})
export class RegistrateExportOrderComponent implements OnInit {
  public order!: IExportRegistrationCont;
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
    this.order = this.exportRegistrationService.getOrderById(this.id);

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  registerExport(): void {
    for (let item of this.order.items) {
      item.quantity -= item.orderedQuantity!;
      delete item.orderedQuantity;
      this.itemsService.update(item.id, item);
    }

    this.exportRegistrationService.removeOrder(this.id);

    this.router.navigate(['/']);
  }
}
