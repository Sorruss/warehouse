import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  public user: any;

  constructor(
    private filterService: FilterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filterService.hideSearchBar();
    this.user = this.authService.getUserDetails();
  }
}
