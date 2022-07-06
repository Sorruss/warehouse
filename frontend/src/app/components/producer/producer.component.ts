import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ProducersService } from 'src/app/services/producers/producers.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css'],
})
export class ProducerComponent implements OnInit {
  public prod: any;
  public srcToPhotos: string = 'http://localhost:8080/api/producer/photo/';

  constructor(
    private filterService: FilterService,
    private producersService: ProducersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveProducer();
    this.filterService.activateSearchBar();
  }
  retrieveProducer(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.producersService.get(id).subscribe({
      next: (data) => {
        this.prod = data;
        console.log('data: ', data);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }

  toItemDetails(id: number, name: string): void {
    this.router.navigate([`/item/${id}`], { state: { pageName: name } });
  }
}
