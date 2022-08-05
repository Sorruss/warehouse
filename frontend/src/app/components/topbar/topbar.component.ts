import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { AdminFeaturesComponent } from '../helpers/admin-features/admin-features.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  private mainSearchBar: any;

  public pageName: string = '';
  public isSearchBarActivated: boolean = false;

  public goBackCond: boolean = false;
  public goHomeCond: boolean = false;

  public isUserAdmin!: boolean;
  public currentPageIsMain: boolean = true;

  public isItemModalActive: boolean = false;
  public isUserModalActive: boolean = false;
  public isProdModalActive: boolean = false;

  private ngUnsubscribe: Subject<boolean> = new Subject();

  @ViewChild(AdminFeaturesComponent) adminFeatures: any;

  constructor(
    private router: Router,
    private location: Location,
    private filterService: FilterService,
    private authService: AuthService
  ) {
    router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((path) => {
      if (path instanceof NavigationEnd && path.url !== '/') {
        this.goBackCond = true;
        this.currentPageIsMain = false;
      }
      if (path instanceof NavigationEnd && path.url === '/') {
        this.goBackCond = false;
        this.currentPageIsMain = true;
      }
      if (path instanceof NavigationEnd && path.url.split('/').length >= 3) {
        this.goHomeCond = true;
        this.currentPageIsMain = false;
      }
      if (path instanceof NavigationEnd && !(path.url.split('/').length >= 3)) {
        this.goHomeCond = false;
      }
      if (path instanceof NavigationEnd) {
        this.pageName = window.history.state?.pageName || '';
      }
    });
  }
  ngOnInit(): void {
    this.mainSearchBar = document.querySelector('#mainSearchBar');
    this.filterService.isSearchBarActivatedObs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: boolean) => {
        this.isSearchBarActivated = value;
      });
    const user = this.authService.getUserDetails();
    this.isUserAdmin = user.user_role === 'admin';
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
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
