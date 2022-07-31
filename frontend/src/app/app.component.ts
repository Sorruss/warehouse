import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'warehouse';
  public isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private themeService: ThemeService
  ) {}
  ngOnInit() {
    if (this.authService.getUserDetails() != null) {
      this.isAuthenticated = true;
    }

    this.themeService.setThemeFromCookie();

    this.authService.isAuthenticatedObs.subscribe((value: boolean) => {
      this.isAuthenticated = value;
      this.changeDetectorRef.detectChanges();
    });
  }
}
