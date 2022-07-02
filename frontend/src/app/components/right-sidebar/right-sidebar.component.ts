import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
  private sidebar: any;
  private searchBar: any;
  private content: any;
  private menuBtn: any;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.searchBar = document.querySelector('#searchBar');
    this.content = document.querySelector('.content');
    this.menuBtn = document.querySelector('#menu-button');
  }
  toggleActive() {
    this.sidebar?.classList.toggle('open');
    this.content?.classList.toggle('offset');
    this.menuBtnChange();
  }
  addActive() {
    this.sidebar?.classList.add('open');
    this.content?.classList.add('offset');
    this.menuBtnChange();
    this.activeSearch();
  }
  activeSearch() {
    this.searchBar.focus();
  }
  menuBtnChange() {
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
