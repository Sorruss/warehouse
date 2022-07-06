import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ObservablesService } from 'src/app/services/observables/observables.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';

  private sidebar: any;
  private searchBar: any;
  private content: any;
  private menuBtn: any;

  public user: any;
  public isPointerEvents: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private observablesService: ObservablesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.searchBar = document.querySelector('#searchBar');
    this.content = document.querySelector('.content');
    this.menuBtn = document.querySelector('#menu-button');

    this.user = this.authService.getUserDetails();
    this.observablesService.isModalObs.subscribe((value) => {
      this.isPointerEvents = !value;
      this.changeDetectorRef.detectChanges();
    });
  }
  toggleActive(): void {
    this.sidebar?.classList.toggle('open');
    this.content?.classList.toggle('offset');
    this.menuBtnChange();
  }
  addActive(): void {
    this.sidebar?.classList.add('open');
    this.content?.classList.add('offset');
    this.menuBtnChange();
    this.activeSearch();
  }
  activeSearch(): void {
    this.searchBar.focus();
  }
  menuBtnChange(): void {
    if (this.sidebar.classList.contains('open')) {
      this.menuBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      this.menuBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }
  toHome(): void {
    this.router.navigate(['']);
  }
  toUserPage(): void {
    this.router.navigate(['user-page']);
  }

  logout(): void {
    this.authService.logout();
  }
}
