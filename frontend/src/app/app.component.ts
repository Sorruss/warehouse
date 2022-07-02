import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'warehouse';
  public isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    if (this.authService.getUserDetails() != null) {
      this.isAuthenticated = true;
    }

    this.authService.isAuthenticatedObs.subscribe((value: boolean) => {
      this.isAuthenticated = value;
    });
  }
}
