import { Component, OnInit } from '@angular/core';

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
export class ProducersComponent implements OnInit {
  public nameToFilter: string = '';

  public producers: any = [];
  public srcToPhotos: string = 'http://localhost:8080/api/producer/photo/';

  constructor(
    private producersService: ProducersService,
    private router: Router,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.retrieveProducers();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }
  retrieveProducers(): void {
    this.producersService.getAll().subscribe({
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
