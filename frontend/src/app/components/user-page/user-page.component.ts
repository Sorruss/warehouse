import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { fadeIn } from 'src/app/animations/animations';

import { getRandomNumber } from 'src/app/functions';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  animations: [fadeIn],
})
export class UserPageComponent implements OnInit {
  public user: any;
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';
  public srcToPhotos2: string = 'http://localhost:8080/api/users/user_photo/';

  public editedUser: any;
  public editingProcess: boolean = false;
  public fileIsLoading: boolean = false;

  public doesUserHavePrivileges: boolean = false;
  public modalActive: boolean = false;

  constructor(
    private filterService: FilterService,
    private authService: AuthService,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.filterService.hideSearchBar();
    this.getUserData();

    if (this.user.user_role === 'moder') {
      this.doesUserHavePrivileges = true;
    }
  }

  getUserData(): void {
    this.user = this.authService.getUserDetails();
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
        this.notificationService.createSuccessfullyDeletedNotification(
          this.user.first_name + ' ' + this.user.last_name,
          true
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );

    // Logout
    this.authService.logout();
  }

  edit(): void {
    this.editedUser = { ...this.user };
    this.editingProcess = true;
  }
  save(): void {
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
        this.authService.setDataInLocalStorage(
          'userData',
          JSON.stringify(data.user)
        );
        this.getUserData();
        this.editingProcess = false;
        this.notificationService.createSuccessNotification();
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
  cancel(): void {
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
