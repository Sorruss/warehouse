import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ItemsService } from 'src/app/services/items/items.service';

import { fadeIn, slide2right } from 'src/app/animations';

import {
  ImportRegistrationService,
  IImportRegistrationCont,
} from 'src/app/services/import-registration/import-registration.service';

@Component({
  selector: 'app-registrate-import-order',
  templateUrl: './registrate-import-order.component.html',
  styleUrls: ['./registrate-import-order.component.css'],
  animations: [fadeIn, slide2right],
})
export class RegistrateImportOrderComponent implements OnInit {
  public order!: IImportRegistrationCont;
  public nameToFilter: string = '';

  private id!: number;

  constructor(
    private importRegistrationService: ImportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.importRegistrationService.getOrderById(this.id);

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  registerImport(): void {
    for (let item of this.order.items) {
      item.quantity += item.orderedQuantity!;
      delete item.orderedQuantity;
      this.itemsService.update(item.id, item);
    }

    this.importRegistrationService.removeOrder(this.id);

    this.router.navigate(['/']);
  }
}
