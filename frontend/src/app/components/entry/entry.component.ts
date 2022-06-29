import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgModel } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { fadeIn, fadeOut } from 'src/app/animations';

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
  ngOnInit(): void {}

  logIn(credentials: {
    companyId: NgModel;
    companyPassword: NgModel;
    workerLogin: NgModel;
    workerPassword: NgModel;
  }): void {
    const res = this.authService.authentication(credentials);
    if (res) {
      this.goHome();
    } else {
      this.notificationService.createInvalidCredentialsNotification(true);
    }
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
  placeholder(t: any): void {
    console.log(t);
  }
}
