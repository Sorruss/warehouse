import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { UsersService } from 'src/app/services/users/users.service';

import { fadeIn, fadeOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeIn, fadeOut],
})
export class UsersComponent implements OnInit {
  public users: any = [];
  public nameToFilter: string = '';
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';

  constructor(
    private filterService: FilterService,
    private usersService: UsersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.retrieveUsers();
    this.filterService.activateSearchBar();
    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
  }

  retrieveUsers(): void {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log('data: ', data);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }

  toUserDetails(id: number, name: string): void {
    this.router.navigate([`/user/${id}`], { state: { pageName: name } });
  }
}
