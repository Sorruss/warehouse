import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, slide2right } from 'src/app/animations';

import {
  ImportRegistrationService,
  IImportRegistrationElem,
  IImportRegistrationCont,
} from './../../services/import-registration/import-registration.service';

@Component({
  selector: 'app-import-registration',
  templateUrl: './import-registration.component.html',
  styleUrls: ['./import-registration.component.css'],
  animations: [fadeIn, slide2right],
})
export class ImportRegistrationComponent implements OnInit {
  public items: IImportRegistrationElem = {};
  public nameToFilter: string = '';

  constructor(
    private importRegistrationService: ImportRegistrationService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.items = this.importRegistrationService.getItems();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }
  getValues(): IImportRegistrationCont[] {
    return Object.values(this.items);
  }
}
