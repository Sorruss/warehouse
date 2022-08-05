import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Router } from '@angular/router';

import { ProducersService } from 'src/app/services/producers/producers.service';
import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn, fadeOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css'],
  animations: [fadeIn, fadeOut],
})
export class ProducersComponent implements OnInit, OnDestroy {
  public nameToFilter: string = '';

  public producers: any = [];
  public srcToPhotos: string = 'http://localhost:8080/api/producer/photo/';

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private producersService: ProducersService,
    private router: Router,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.retrieveProducers();

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

  retrieveProducers(): void {
    this.producersService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.producers = data;
          console.log('data: ', data);
        },
        error: (error) => {
          console.log('error: ', error);
        },
      });
  }

  toProducer(id: number, name: string): void {
    this.router.navigate([`/producer/${id}`], { state: { pageName: name } });
  }
}
