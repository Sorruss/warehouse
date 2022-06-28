import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, slide2right } from 'src/app/animations';

import {
  ExportRegistrationService,
  IExportRegistrationElem,
  IExportRegistrationCont,
} from './../../services/export-registration/export-registration.service';

@Component({
  selector: 'app-export-registration',
  templateUrl: './export-registration.component.html',
  styleUrls: ['./export-registration.component.css'],
  animations: [fadeIn, slide2right],
})
export class ExportRegistrationComponent implements OnInit {
  public items: IExportRegistrationElem = {};
  public nameToFilter: string = '';

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.items = this.exportRegistrationService.getItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }
  getValues(): IExportRegistrationCont[] {
    return Object.values(this.items);
  }
}
