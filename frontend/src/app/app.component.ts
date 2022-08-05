import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from './services/theme/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

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
    private themeService: ThemeService,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    // LANGUAGE
    this.translateService.addLangs(['ua', 'en', 'pl']);
    this.translateService.setDefaultLang('ua');
    if (this.cookieService.check('language')) {
      this.translateService.use(this.cookieService.get('language'));
    }

    // THEME
    this.themeService.setThemeFromCookie();

    // IF USER IS AUTHENTICATED
    if (this.authService.getUserDetails() != null) {
      this.isAuthenticated = true;
    }
    this.authService.isAuthenticatedObs.subscribe((value: boolean) => {
      this.isAuthenticated = value;
      this.changeDetectorRef.detectChanges();
    });
  }
}
