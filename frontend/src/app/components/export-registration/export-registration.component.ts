import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, slide2right } from 'src/app/animations/animations';

import { ExportRegistrationService } from './../../services/export-registration/export-registration.service';

@Component({
  selector: 'app-export-registration',
  templateUrl: './export-registration.component.html',
  styleUrls: ['./export-registration.component.css'],
  animations: [fadeIn, slide2right],
})
export class ExportRegistrationComponent implements OnInit, OnDestroy {
  public items: any = {};
  public nameToFilter: string = '';

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.retrieveOrders();

    this.filterService.filterPropObs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.nameToFilter = value;
      });
    this.filterService.activateSearchBar();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  retrieveOrders(): void {
    this.exportRegistrationService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log('data: ', data);
        },
        error: (error) => console.log('error: ', error),
      });
  }
}
