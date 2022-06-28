import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css'],
})
export class SiteSettingsComponent implements OnInit {
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.hideSearchBar();
  }
}
