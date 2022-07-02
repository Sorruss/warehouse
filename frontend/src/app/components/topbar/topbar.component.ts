import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  private mainSearchBar: any;
  public goBackCond: boolean = false;
  public goHomeCond: boolean = false;

  public pageName!: string;
  public isSearchBarActivated: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private filterService: FilterService
  ) {
    router.events.subscribe((path) => {
      if (path instanceof NavigationEnd && path.url !== '/') {
        this.goBackCond = true;
      }
      if (path instanceof NavigationEnd && path.url === '/') {
        this.goBackCond = false;
      }
      if (path instanceof NavigationEnd && path.url.split('/').length >= 3) {
        this.goHomeCond = true;
      }
      if (path instanceof NavigationEnd && !(path.url.split('/').length >= 3)) {
        this.goHomeCond = false;
      }
      if (path instanceof NavigationEnd) {
        this.pageName = window.history.state?.pageName || 'склад';
      }
    });
  }
  ngOnInit(): void {
    this.mainSearchBar = document.querySelector('#mainSearchBar');
    this.filterService.isSearchBarActivatedObs.subscribe((value: boolean) => {
      this.isSearchBarActivated = value;
    });
  }
  activeSearch(): void {
    this.mainSearchBar.focus();
  }
  goBack(): void {
    this.location.back();
  }
  goHome(): void {
    this.router.navigateByUrl('/');
  }

  setFilterValue(value: string): void {
    this.filterService.filterProp.next(value);
  }
}
