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

  @ViewChild('item_nameInput') item_nameInput: any;
  @ViewChild('item_incomeDate') item_incomeDate: any;
  @ViewChild('item_quantity') item_quantity: any;
  @ViewChild('item_producer') item_producer: any;
  @ViewChild('item_photo') item_photo: any;
  @ViewChild('item_description') item_description: any;

  @ViewChild('user_firstname') user_firstname: any;
  @ViewChild('user_middlename') user_middlename: any;
  @ViewChild('user_lastname') user_lastname: any;
  @ViewChild('user_position') user_position: any;
  @ViewChild('user_phone1') user_phone1: any;
  @ViewChild('user_phone2') user_phone2: any;
  @ViewChild('user_login') user_login: any;
  @ViewChild('user_pass1') user_pass1: any;
  @ViewChild('user_pass2') user_pass2: any;
  @ViewChild('user_role') user_role: any;
  @ViewChild('user_photo') user_photo: any;

  @ViewChild('prod_name') prod_name: any;
  @ViewChild('prod_phone1') prod_phone1: any;
  @ViewChild('prod_phone2') prod_phone2: any;
  @ViewChild('prod_photo') prod_photo: any;
  @ViewChild('prod_description') prod_description: any;

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
      !this.item_nameInput.control.value ||
      !this.item_quantity.control.value ||
      !this.item_producer.control.value ||
      !this.item_photo.control.value ||
      !this.item_description.control.value
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
    document.querySelector('textarea')!.value = '';
    document.querySelector('select')!.selectedIndex = 0;
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
    this.clearErrors();
  }
  closeAddUserModal(): void {
    this.isUserModalActive = false;
    this.observablesService.isModal.next(false);
    // this.clearErrors();
  }
  closeAddProdModal(): void {
    this.isProdModalActive = false;
    this.observablesService.isModal.next(false);
    // this.clearErrors();
  }

  clearErrors(): void {
    this.item_nameInput.control.touched = false;
    this.item_incomeDate.control.touched = false;
    this.item_quantity.control.touched = false;
    this.item_producer.control.touched = false;
    this.item_photo.control.touched = false;
    this.item_description.control.touched = false;
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
      !this.user_firstname.control.value ||
      !this.user_middlename.control.value ||
      !this.user_lastname.control.value ||
      !this.user_position.control.value ||
      !this.user_phone1.control.value ||
      !this.user_phone2.control.value ||
      !this.user_login.control.value ||
      !this.user_pass1.control.value ||
      !this.user_pass2.control.value ||
      !this.user_role.control.value ||
      !this.user_photo.control.value
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
    document.querySelector('textarea')!.value = '';
    document.querySelector('select')!.selectedIndex = 0;
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
      !this.prod_name.control.value ||
      !this.prod_phone1.control.value ||
      !this.prod_phone2.control.value ||
      !this.prod_photo.control.value ||
      !this.prod_description.control.value
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
    document.querySelector('textarea')!.value = '';
    document.querySelector('select')!.selectedIndex = 0;
  }
}
