import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  private mainSearchBar: any;

  constructor() {}
  ngOnInit(): void {
    this.mainSearchBar = document.querySelector('#mainSearchBar');
  }
  activeSearch() {
    this.mainSearchBar.focus();
  }
}
