import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { UsersService } from 'src/app/services/users/users.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { fadeIn, slide2right } from 'src/app/animations/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeIn, slide2right],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: any = [];
  public nameToFilter: string = '';
  public cuser: any;
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';

  private ngUnsubscribe: Subject<boolean> = new Subject();

  public doesUserHavePrivileges: boolean = false;
  public modalActive: boolean = false;
  private userToDelete: any = {};

  constructor(
    private filterService: FilterService,
    private usersService: UsersService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.retrieveUsers();
    this.filterService.activateSearchBar();
    this.filterService.filterPropObs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.nameToFilter = value;
      });

    this.cuser = this.authService.getUserDetails();
    if (this.cuser.user_role === 'moder') {
      this.doesUserHavePrivileges = true;
    }
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

  editUser(id: number, name: string): void {
    this.router.navigate([`/user/${id}`], {
      state: { pageName: name, editing: true },
    });
  }
  async deleteUser(id: number, fullname: string) {
    if (this.cuser.id === id) {
      this.authService.logout();
    }

    // Deleting user from the local list for the nice animationa
    this.users = this.users.filter((user: any) => user.id !== id);

    // Deleting user's photo
    await this.usersService.deletePhotoById(id).subscribe(
      (response) => {
        console.log('response: ', response);
      },
      (error) => {
        console.log('error: ', error);
      }
    );

    // Deleting user
    await this.usersService.delete(id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.notificationService.createSuccessfullyDeletedNotification(
          fullname,
          true
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  chooseUserToDelete(id: number, fullname: string): void {
    this.userToDelete.id = id;
    this.userToDelete.fullname = fullname;
    this.modalActive = true;
  }
  onCloseEvent(confirm: boolean): void {
    this.modalActive = false;
    if (confirm) {
      this.deleteUser(this.userToDelete.id, this.userToDelete.fullname);
    }
  }
}
