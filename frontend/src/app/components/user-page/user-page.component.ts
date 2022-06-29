import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.hideSearchBar();
  }
}
