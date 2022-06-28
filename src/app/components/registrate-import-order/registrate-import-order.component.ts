import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';

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

  constructor(
    private importRegistrationService: ImportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.importRegistrationService.getItemsById(id);

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }
}
