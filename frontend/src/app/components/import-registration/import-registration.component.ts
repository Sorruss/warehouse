import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, slide2right } from 'src/app/animations/animations';

import { ImportRegistrationService } from './../../services/import-registration/import-registration.service';

@Component({
  selector: 'app-import-registration',
  templateUrl: './import-registration.component.html',
  styleUrls: ['./import-registration.component.css'],
  animations: [fadeIn, slide2right],
})
export class ImportRegistrationComponent implements OnInit {
  public items: any = [];
  public nameToFilter: string = '';

  constructor(
    private importRegistrationService: ImportRegistrationService,
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
    this.importRegistrationService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        console.log('data: ', data);
      },
      error: (error) => console.log('error: ', error),
    });
  }
}
