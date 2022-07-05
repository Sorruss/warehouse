import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgModel } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { fadeIn, fadeOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  animations: [fadeIn, fadeOut],
})
export class EntryComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    if (this.authService.getUserDetails()) {
      this.router.navigate(['/']);
    }
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
}
