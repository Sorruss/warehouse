import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { NgModel } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

import { fadeIn, fadeOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  animations: [fadeIn, fadeOut],
})
export class EntryComponent implements OnInit {
  public selectedLanguage: string = 'ua';
  public backgroundImage: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private cookieService: CookieService,
    private domSanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    if (this.authService.getUserDetails()) {
      this.router.navigate(['/']);
    }
    if (this.cookieService.check('language')) {
      this.selectedLanguage = this.cookieService.get('language');
    }

    fetch('http://localhost:8080/entry_photo')
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        this.backgroundImage = this.sanitize(imageObjectURL);
      })
      .catch((error) => {
        console.log('error!@#: ', error);
        document.querySelector<HTMLElement>(
          '.background-secondary'
        )!.style.display = 'block';
      });
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  logIn(credentials: {
    companyId: NgModel;
    companyPassword: NgModel;
    workerLogin: NgModel;
    workerPassword: NgModel;
  }): void {
    this.authService
      .login({
        company_id: credentials.companyId.control.value,
        company_password: credentials.companyPassword.control.value,
        user_login: credentials.workerLogin.control.value,
        user_password: credentials.workerPassword.control.value,
      })
      .subscribe(
        (response) => {
          if (response.status) {
            console.log('response: ', response);
            this.authService.setDataInLocalStorage(
              'userData',
              JSON.stringify(response.user)
            );
            this.authService.setDataInLocalStorage('token', response.token);
            this.notificationService.createSuccessLogInNotification(true);
            this.router.navigate(['/']);
            this.authService.isAuthenticated.next(true);
          }
        },
        (error) => {
          this.notificationService.createInvalidCredentialsNotification(true);
          console.log('error: ', error);
        }
      );
  }

  selectLanguage(value: string): void {
    if (!this.translateService.getLangs().includes(value)) {
      return;
    }
    this.translateService.use(value);
    this.cookieService.set('language', value);
    this.selectedLanguage = value;

    // Trying to get translate of word for the correct notification.
    let trans: string = '';
    if (value === 'ua' || !value) {
      trans = "Параметр 'Мова сайту'";
    } else if (value === 'en') {
      trans = 'Site language option';
    } else if (value === 'pl') {
      trans = 'Opcja języka witryny';
    }

    value = document.querySelector(`option[value='${value}']`)!.innerHTML;
    this.notificationService.createSmthWasChangedNotification(trans, value);
  }
}
