import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ObservablesService } from 'src/app/services/observables/observables.service';
import { ProducersService } from 'src/app/services/producers/producers.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { UsersService } from 'src/app/services/users/users.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CookieService } from 'ngx-cookie-service';

import { getDate, getRandomNumber } from 'src/app/functions';

@Component({
  selector: 'app-admin-features',
  templateUrl: './admin-features.component.html',
  styleUrls: ['./admin-features.component.css'],
})
export class AdminFeaturesComponent implements OnInit, OnDestroy {
  private companyId!: number;

  public isItemModalActive: boolean = false;
  public isUserModalActive: boolean = false;
  public isProdModalActive: boolean = false;
  public newItem: any = {};
  public newUser: any = {};
  public userPassword: any = {};
  public newProd: any = {};
  public producers: any = [];

  @ViewChild('itemForm') itemForm: any;
  @ViewChild('userForm') userForm: any;
  @ViewChild('prodForm') prodForm: any;

  private photos: any = {};

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private authService: AuthService,
    private observablesService: ObservablesService,
    private producersService: ProducersService,
    private itemsService: ItemsService,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    const user = this.authService.getUserDetails();
    this.companyId = user.company_id;

    this.customUploadFileButton();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  customUploadFileButton(): void {
    const inputs: any = document.querySelectorAll('.inputfile');
    inputs.forEach((input: any) => {
      const label = input.nextElementSibling;
      const labelVal = label.innerHTML;
      input.addEventListener('change', (e: any) => {
        let fileName = e.target.value.split('\\').pop();
        if (fileName) {
          if (fileName.length > 25) {
            fileName = fileName.slice(0, 21) + ' ...';
          }
          label.querySelector('span').innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
      });
    });
  }

  addNewItem(): void {
    // Validate the form.
    if (
      !this.itemForm.form.controls.item_name.value ||
      !this.itemForm.form.controls.item_quantity.value ||
      !this.itemForm.form.controls.item_producer.value ||
      !this.itemForm.form.controls.item_description.value
    ) {
      this.notificationService.createInvalidCredentialsNotification(true);
      return;
    }

    // Check photo field, set default value if needed.
    if (this.photos.item_photo) {
      this.saveItemPhoto();
    } else {
      this.newItem.photo_src = 'default';
    }

    // Trying to get translate of word for the correct notification.
    let trans: string = '';
    const lang = this.cookieService.get('language');
    if (lang === 'ua' || !lang) {
      trans = 'Товар';
    } else if (lang === 'en') {
      trans = 'Product';
    }

    // Other stuff.
    this.changeAnItemBeforeCreation();
    this.createAnItem();
    this.closeAddItemModal();
    this.notificationService.createSomethingWasCreatedNotification(
      trans,
      this.newItem.item_name
    );
    this.clearItemAfterAdding();
  }
  changeAnItemBeforeCreation(): void {
    // Added other propties and changed some.
    this.newItem.company_id = this.companyId;
    if (this.newItem.income_date) {
      const { month, day, weekDayNumber, hours, minutes } = getDate(
        this.newItem.income_date
      );
      const date = `${month} ${day}(${weekDayNumber}) ${hours}:${minutes}`;
      this.newItem.income_date = date;
    } else {
      const { month, day, weekDayNumber, hours, minutes } = getDate();
      const date = `${month} ${day}(${weekDayNumber}) ${hours}:${minutes}`;
      this.newItem.income_date = date;
    }
  }
  createAnItem(): void {
    // Creation.
    this.itemsService
      .create(this.newItem)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (reponse) => {
          console.log('response: ', reponse);
          this.itemWasAdded();
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  itemWasAdded(): void {
    // Tell the main page that there is new item available for retrieving.
    this.observablesService.isNewItem.next(true);
  }
  clearItemAfterAdding(): void {
    // Clear all inputs, item, select and textarea.
    this.newItem = {};
    document
      .querySelectorAll('.modal-body.item input')
      .forEach((input: any) => {
        input.value = '';
        if (input.type === 'file') {
          const label = input.nextElementSibling;
          label.querySelector('span').innerHTML = 'Оберіть файл';
        }
      });

    // @ts-ignore
    document.querySelector('.modal-body.item textarea')!.value = '';
    // @ts-ignore
    document.querySelector('.modal-body.item select')!.selectedIndex = 0;
  }
  retrieveProducers(): void {
    this.producersService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.producers = data;
          console.log('data: ', data);
        },
        error: (error) => {
          console.log('error: ', error);
        },
      });
  }

  openAddItemModal(): void {
    this.retrieveProducers();
    this.isItemModalActive = true;
    this.observablesService.isModal.next(true);
  }
  openAddUserModal(): void {
    this.isUserModalActive = true;
    this.observablesService.isModal.next(true);
  }
  openAddProdModal(): void {
    this.isProdModalActive = true;
    this.observablesService.isModal.next(true);
  }
  closeAddItemModal(): void {
    this.isItemModalActive = false;
    this.observablesService.isModal.next(false);
    this.clearItemErrors();
  }
  closeAddUserModal(): void {
    this.isUserModalActive = false;
    this.observablesService.isModal.next(false);
    this.clearUserErrors();
  }
  closeAddProdModal(): void {
    this.isProdModalActive = false;
    this.observablesService.isModal.next(false);
    this.clearProdErrors();
  }

  clearItemErrors(): void {
    this.itemForm.form.controls.item_name.touched = false;
    this.itemForm.form.controls.item_incomeDate.touched = false;
    this.itemForm.form.controls.item_quantity.touched = false;
    this.itemForm.form.controls.item_producer.touched = false;
    this.itemForm.form.controls.item_photo.touched = false;
    this.itemForm.form.controls.item_description.touched = false;
  }
  clearUserErrors(): void {
    this.userForm.form.controls.user_firstname.touched = false;
    this.userForm.form.controls.user_middlename.touched = false;
    this.userForm.form.controls.user_lastname.touched = false;
    this.userForm.form.controls.user_position.touched = false;
    this.userForm.form.controls.user_phone1.touched = false;
    this.userForm.form.controls.user_phone2.touched = false;
    this.userForm.form.controls.user_login.touched = false;
    this.userForm.form.controls.user_pass1.touched = false;
    this.userForm.form.controls.user_pass2.touched = false;
    this.userForm.form.controls.user_role.touched = false;
    this.userForm.form.controls.user_photo.touched = false;
  }
  clearProdErrors(): void {
    this.prodForm.form.controls.prod_name.touched = false;
    this.prodForm.form.controls.prod_phone1.touched = false;
    this.prodForm.form.controls.prod_phone2.touched = false;
    this.prodForm.form.controls.prod_photo.touched = false;
    this.prodForm.form.controls.prod_description.touched = false;
  }

  addNewUser(): void {
    // Validate the form.
    if (
      !this.userForm.form.controls.user_firstname.value ||
      !this.userForm.form.controls.user_middlename.value ||
      !this.userForm.form.controls.user_lastname.value ||
      !this.userForm.form.controls.user_position.value ||
      !this.userForm.form.controls.user_phone1.value ||
      !this.userForm.form.controls.user_phone2.value ||
      !this.userForm.form.controls.user_login.value ||
      !this.userForm.form.controls.user_pass1.value ||
      !this.userForm.form.controls.user_pass2.value ||
      !this.userForm.form.controls.user_role.value ||
      !this.userForm.form.controls.user_photo.value
    ) {
      this.notificationService.createInvalidCredentialsNotification(true);
      return;
    }

    if (this.photos.user_photo) {
      this.saveUserPhoto();
    } else {
      this.newUser.photo_src = 'default';
    }

    // Trying to get translate of word for the correct notification.
    let trans: string = '';
    const lang = this.cookieService.get('language');
    if (lang === 'ua' || !lang) {
      trans = 'Користувач';
    } else if (lang === 'en') {
      trans = 'User';
    }

    this.changeAnUserBeforeCreation();
    this.createAnUser();
    this.closeAddUserModal();
    this.notificationService.createSomethingWasCreatedNotification(
      trans,
      this.newUser.first_name + ' ' + this.newUser.last_name
    );
    this.clearUserAfterAdding();
  }
  createAnUser(): void {
    // Creation.
    this.usersService
      .create(this.newUser)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  clearUserAfterAdding(): void {
    // Clear all inputs, item, select and textarea.
    this.newUser = {};
    document
      .querySelectorAll('.modal-body.user input')
      .forEach((input: any) => {
        input.value = '';
        if (input.type === 'file') {
          const label = input.nextElementSibling;
          label.querySelector('span').innerHTML = 'Оберіть файл';
        }
      });

    // @ts-ignore
    document.querySelector('.modal-body.user textarea')!.value = '';
    // @ts-ignore
    document.querySelector('.modal-body.user select')!.selectedIndex = 0;
  }
  changeAnUserBeforeCreation(): void {
    if (this.userPassword.first === this.userPassword.second) {
      this.newUser.user_password = this.userPassword.first;
    }
    this.newUser.company_id = this.companyId;
  }

  addNewProd(): void {
    // Validate the form.
    if (
      !this.prodForm.form.controls.prod_name.value ||
      !this.prodForm.form.controls.prod_phone1.value ||
      !this.prodForm.form.controls.prod_phone2.value ||
      !this.prodForm.form.controls.prod_photo.value ||
      !this.prodForm.form.controls.prod_description.value
    ) {
      this.notificationService.createInvalidCredentialsNotification(true);
      return;
    }

    if (this.photos.prod_photo) {
      this.saveProdPhoto();
    } else {
      this.newProd.photo_src = 'default';
    }

    // Trying to get translate of word for the correct notification.
    let trans: string = '';
    const lang = this.cookieService.get('language');
    if (lang === 'ua' || !lang) {
      trans = 'Виробник';
    } else if (lang === 'en') {
      trans = 'Producer';
    }

    this.createAnProd();
    this.closeAddProdModal();
    this.notificationService.createSomethingWasCreatedNotification(
      trans,
      this.newProd.producer_name
    );
    this.clearProdAfterAdding();
  }
  createAnProd(): void {
    // Creation.
    this.producersService
      .create(this.newProd)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  clearProdAfterAdding(): void {
    // Clear all inputs, item, select and textarea.
    this.newProd = {};
    document
      .querySelectorAll('.modal-body.prod input')
      .forEach((input: any) => {
        input.value = '';
        if (input.type === 'file') {
          const label = input.nextElementSibling;
          label.querySelector('span').innerHTML = 'Оберіть файл';
        }
      });

    // @ts-ignore
    document.querySelector('.modal-body.prod textarea')!.value = '';
    // @ts-ignore
    document.querySelector('.modal-body.prod select')!.selectedIndex = 0;
  }

  changeItemPhoto(event: any): void {
    this.photos.item_photo = <File>event.target.files[0];
  }
  changeUserPhoto(event: any): void {
    this.photos.user_photo = <File>event.target.files[0];
  }
  changeProdPhoto(event: any): void {
    this.photos.prod_photo = <File>event.target.files[0];
  }
  saveItemPhoto(): void {
    const file: File = this.photos.item_photo;
    const formData = new FormData();
    const filename = `${getRandomNumber(10001, 99999)}_${file.name}`;
    this.newItem.photo_src = filename;
    formData.append('file', file, filename);

    this.itemsService
      .attach(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  saveUserPhoto(): void {
    const file: File = this.photos.user_photo;
    const formData = new FormData();
    const filename = `${getRandomNumber(10001, 99999)}_${file.name}`;
    this.newUser.photo_src = filename;
    formData.append('file', file, filename);

    this.usersService
      .attach(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  saveProdPhoto(): void {
    const file: File = this.photos.prod_photo;
    const formData = new FormData();
    const filename = `${getRandomNumber(10001, 99999)}_${file.name}`;
    this.newProd.photo_src = filename;
    formData.append('file', file, filename);

    this.producersService
      .attach(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
