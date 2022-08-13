import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import { DirectAccessGuard } from 'src/app/services/direct-access-guard/direct-access-guard.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FilterService } from 'src/app/services/filter/filter.service';

import { fadeIn } from 'src/app/animations/animations';

import { getRandomNumber } from 'src/app/functions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn],
})
export class UserComponent implements OnInit {
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';
  public srcToPhotos2: string = 'http://localhost:8080/api/users/user_photo/';
  public user: any;
  public cuser: any;
  public id!: number;

  public editedUser: any;
  public editingProcess: boolean = false;
  public fileIsLoading: boolean = false;

  public doesUserHavePrivileges: boolean = false;
  public modalActive: boolean = false;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private directAccessGuard: DirectAccessGuard,
    private authService: AuthService,
    private notificationService: NotificationService,
    private filterService: FilterService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.filterService.hideSearchBar();

    this.id = this.activatedRoute.snapshot.params.id;
    this.retrieveUser();
    this.cuser = this.authService.getUserDetails();

    if (this.cuser.user_role === 'moder') {
      this.doesUserHavePrivileges = true;
    }
  }

  retrieveUser(): void {
    this.usersService.get(this.id).subscribe({
      next: (data) => {
        this.user = data;
        this.directAccessGuard.guard(data.company_id);

        if (window.history.state.editing) {
          this.edit();
        }
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }

  async delete() {
    // Deleting user's photo
    await this.usersService.deletePhotoById(this.user.id).subscribe(
      (response) => {
        console.log('response: ', response);
      },
      (error) => {
        console.log('error: ', error);
      }
    );

    // Deleting user
    await this.usersService.delete(this.user.id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.router.navigateByUrl('/users');
        this.notificationService.createSuccessfullyDeletedNotification(
          this.user.first_name + ' ' + this.user.last_name,
          true
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );

    // Logout if current user was deleted
    if (this.cuser.id === this.id) {
      this.authService.logout();
    }
  }

  edit(): void {
    this.editedUser = { ...this.user };
    this.editingProcess = true;
  }
  save(): void {
    if (window.history.state.editing) {
      window.history.state.editing = false;
    }

    // Doing stuff with images of the user.
    if (
      this.editedUser.photo_src !== this.user.photo_src &&
      this.user.photo_src !== 'default'
    ) {
      this.usersService.deletePhotoById(this.user.id).subscribe({
        next: (data) => {
          console.log('response: ', data);
        },
        error: (error) => {
          console.log('error: ', error);
        },
      });

      if (!this.editedUser.photo_src) {
        this.editedUser.photo_src = 'default';
      }
    }

    // Patching an user.
    this.usersService.patch(this.user.id, this.editedUser).subscribe({
      next: (data) => {
        console.log('!response: ', data);
        if (this.cuser.id === this.id) {
          this.authService.setDataInLocalStorage(
            'userData',
            JSON.stringify(data.user)
          );
        }
        this.retrieveUser();
        this.editingProcess = false;
        this.notificationService.createSuccessNotification();
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
  cancel(): void {
    if (window.history.state.editing) {
      window.history.state.editing = false;
    }

    this.editingProcess = false;
    this.deletePrevPhoto();
  }

  choosePhoto(event: any): void {
    this.fileIsLoading = true;

    const file: File = <File>event.target.files[0];
    const formData = new FormData();
    const filename = `${getRandomNumber(10001, 99999)}_${file.name}`;
    formData.append('file', file, filename);

    this.deletePrevPhoto();
    this.usersService.attach(formData).subscribe(
      (response: any) => {
        this.editedUser.photo_src = filename;
        this.fileIsLoading = false;
        console.log('response: ', response);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }
  deletePrevPhoto(): void {
    if (this.editedUser.photo_src !== this.user.photo_src) {
      this.usersService.deletePhotoByName(this.editedUser.photo_src).subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    }
  }

  onCloseEvent(confirm: boolean): void {
    this.modalActive = false;
    if (confirm) {
      this.delete();
    }
  }
}
