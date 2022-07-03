import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css'],
})
export class SiteSettingsComponent implements OnInit {
  public selectedNotificationTime: string = '3000';
  public selectedTheme: string = 'dark';
  public selectedLanguage: string = 'ukrainian';

  constructor(
    private filterService: FilterService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.filterService.hideSearchBar();

    if (this.cookieService.check('notificationTime')) {
      this.selectedNotificationTime =
        this.cookieService.get('notificationTime');
    }
    if (this.cookieService.check('theme')) {
      this.selectedTheme = this.cookieService.get('theme');
    }
    if (this.cookieService.check('language')) {
      this.selectedLanguage = this.cookieService.get('language');
    }
  }

  selectNotificationTime(value: string): void {
    this.cookieService.set('notificationTime', value);
  }
  selectTheme(value: string): void {
    this.cookieService.set('theme', value);
  }
  selectLanguage(value: string): void {
    this.cookieService.set('language', value);
  }
}
