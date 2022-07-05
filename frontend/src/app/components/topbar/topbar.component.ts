import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ObservablesService } from 'src/app/services/observables/observables.service';
import { ProducersService } from 'src/app/services/producers/producers.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { UsersService } from 'src/app/services/users/users.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { date2Ukrainian } from 'src/app/functions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  private mainSearchBar: any;
  private companyId!: number;

  public pageName: string = 'склад';
  public isSearchBarActivated: boolean = false;

  public goBackCond: boolean = false;
  public goHomeCond: boolean = false;

  public isUserAdmin!: boolean;
  public currentPageIsMain: boolean = true;

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

  constructor(
    private router: Router,
    private location: Location,
    private filterService: FilterService,
    private authService: AuthService,
    private observablesService: ObservablesService,
    private producersService: ProducersService,
    private itemsService: ItemsService,
    private notificationService: NotificationService,
    private usersService: UsersService
  ) {
    router.events.subscribe((path) => {
      if (path instanceof NavigationEnd && path.url !== '/') {
        this.goBackCond = true;
        this.currentPageIsMain = false;
      }
      if (path instanceof NavigationEnd && path.url === '/') {
        this.goBackCond = false;
        this.currentPageIsMain = true;
      }
      if (path instanceof NavigationEnd && path.url.split('/').length >= 3) {
        this.goHomeCond = true;
        this.currentPageIsMain = false;
      }
      if (path instanceof NavigationEnd && !(path.url.split('/').length >= 3)) {
        this.goHomeCond = false;
      }
      if (path instanceof NavigationEnd) {
        this.pageName = window.history.state?.pageName || 'склад';
      }
    });
  }
  ngOnInit(): void {
    this.mainSearchBar = document.querySelector('#mainSearchBar');
    this.filterService.isSearchBarActivatedObs.subscribe((value: boolean) => {
      this.isSearchBarActivated = value;
    });
    const user = this.authService.getUserDetails();
    this.isUserAdmin = user.user_role === 'admin';
    this.companyId = user.company_id;

    this.customUploadFileButton();
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
  activeSearch(): void {
    this.mainSearchBar.focus();
  }
  goBack(): void {
    this.location.back();
  }
  goHome(): void {
    this.router.navigateByUrl('/');
  }
  setFilterValue(value: string): void {
    this.filterService.filterProp.next(value);
  }

  addNewItem(): void {
    // Validate the form.
    if (
      !this.itemForm.form.controls.item_name.value ||
      !this.itemForm.form.controls.item_quantity.value ||
      !this.itemForm.form.controls.item_producer.value ||
      !this.itemForm.form.controls.item_photo.value ||
      !this.itemForm.form.controls.item_description.value
    ) {
      this.notificationService.createInvalidCredentialsNotification(true);
      return;
    }

    this.changeAnItemBeforeCreation();
    this.createAnItem();
    this.closeAddItemModal();
    this.notificationService.createSomethingWasCreatedNotification(
      'Товар',
      this.newItem.item_name
    );
    this.clearItemAfterAdding();
  }
  changeAnItemBeforeCreation(): void {
    // Added other propties and changed some.
    this.newItem.photo_src = <string>this.newItem.photo_src.split('\\').pop();
    this.newItem.company_id = this.companyId;
    if (this.newItem.income_date) {
      const { month, day, weekDayNumber, hours, minutes } = date2Ukrainian(
        this.newItem.income_date
      );
      const date = `${month} ${day}(${weekDayNumber}) ${hours}:${minutes}`;
      this.newItem.income_date = date;
    } else {
      const { month, day, weekDayNumber, hours, minutes } = date2Ukrainian();
      const date = `${month} ${day}(${weekDayNumber}) ${hours}:${minutes}`;
      this.newItem.income_date = date;
    }
  }
  createAnItem(): void {
    // Creation.
    this.itemsService.create(this.newItem).subscribe(
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
    this.producers = this.producersService.getAll().subscribe({
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

  downloadPhoto(): void {
    const form = <any>document.getElementById('test');
    const formData = new FormData(form);

    formData.append('test', <any>document.querySelector('.inputfile'));

    for (var test of formData.getAll('test')) {
      console.log(test);
    }
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

    this.changeAnUserBeforeCreation();
    this.createAnUser();
    this.closeAddUserModal();
    this.notificationService.createSomethingWasCreatedNotification(
      'Користувач',
      this.newUser.first_name + ' ' + this.newUser.last_name
    );
    this.clearUserAfterAdding();
  }
  createAnUser(): void {
    // Creation.
    this.usersService.create(this.newUser).subscribe(
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
    this.newUser.photo_src = <string>this.newUser.photo_src.split('\\').pop();
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

    this.changeAnProdBeforeCreation();
    this.createAnProd();
    this.closeAddProdModal();
    this.notificationService.createSomethingWasCreatedNotification(
      'Виробник',
      this.newProd.producer_name
    );
    this.clearProdAfterAdding();
  }
  changeAnProdBeforeCreation(): void {
    this.newProd.photo_src = <string>this.newProd.photo_src.split('\\').pop();
  }
  createAnProd(): void {
    // Creation.
    this.producersService.create(this.newProd).subscribe(
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
}
