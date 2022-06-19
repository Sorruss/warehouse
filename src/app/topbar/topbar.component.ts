import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  private mainSearchBar: any;
  public goBackCond: boolean = false;
  public goHomeCond: boolean = false;

  constructor(private router: Router, private location: Location) {
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
    });
  }
  ngOnInit(): void {
    this.mainSearchBar = document.querySelector('#mainSearchBar');
  }
  activeSearch() {
    this.mainSearchBar.focus();
  }
  goBack(): void {
    this.location.back();
  }
  goHome(): void {
    this.router.navigateByUrl('/');
  }
}
