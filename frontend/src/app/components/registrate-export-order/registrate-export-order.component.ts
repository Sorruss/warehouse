import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';

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

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.exportRegistrationService.getOrderById(id);

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }
}
