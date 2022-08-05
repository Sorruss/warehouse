import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class UsersComponent implements OnInit, OnDestroy {
  public users: any = [];
  public nameToFilter: string = '';
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private filterService: FilterService,
    private usersService: UsersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.retrieveUsers();
    this.filterService.activateSearchBar();
    this.filterService.filterPropObs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.nameToFilter = value;
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  retrieveUsers(): void {
    this.usersService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
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
