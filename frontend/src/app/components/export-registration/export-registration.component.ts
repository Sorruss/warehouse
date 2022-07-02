import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, slide2right } from 'src/app/animations/animations';

import {
  IExportRegistrationCont,
  IExportRegistrationElem,
} from 'src/app/interfaces';

import { ExportRegistrationService } from './../../services/export-registration/export-registration.service';

@Component({
  selector: 'app-export-registration',
  templateUrl: './export-registration.component.html',
  styleUrls: ['./export-registration.component.css'],
  animations: [fadeIn, slide2right],
})
export class ExportRegistrationComponent implements OnInit {
  public items: any = {};
  public nameToFilter: string = '';

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.retrieveOrders();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  retrieveOrders(): void {
    this.exportRegistrationService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        console.log('data: ', data);
      },
      error: (error) => console.log('error: ', error),
    });
  }
}
