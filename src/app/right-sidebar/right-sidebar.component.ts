import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
  private sidebar: any;
  private searchBar: any;
  private content: any;

  constructor() {}
  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.searchBar = document.querySelector('#searchBar');
    this.content = document.querySelector('.container.content');
  }
  toggleActive() {
    this.sidebar?.classList.toggle('active');
    this.content?.classList.toggle('offset');
  }
  addActive() {
    this.sidebar?.classList.add('active');
    this.content?.classList.add('offset');
  }
  activeSearch() {
    this.searchBar.focus();
  }
}
