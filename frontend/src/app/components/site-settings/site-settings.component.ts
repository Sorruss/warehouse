import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css'],
})
export class SiteSettingsComponent implements OnInit {
  public selectedNotificationTime: string = '3000';
  public selectedTheme: string = 'dark';
  public selectedLanguage: string = 'ua';

  constructor(
    private filterService: FilterService,
    private cookieService: CookieService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private translateService: TranslateService
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

    // Trying to get translate of word for the correct notification.
    let trans: string = '';
    const lang = this.selectedLanguage;
    if (lang === 'ua' || !lang) {
      trans = 'Час зникнення повідомлень';
    } else if (lang === 'en') {
      trans = 'Disappearance time of messages';
    }

    value = document.querySelector(`option[value='${value}']`)!.innerHTML;
    this.notificationService.createSmthWasChangedNotification(trans, value);
  }
  selectTheme(value: string): void {
    if (value === 'light') {
      this.themeService.setLightTheme();
    } else if (value === 'dark') {
      this.themeService.setDarkTheme();
    }
    this.cookieService.set('theme', value);

    // Trying to get translate of word for the correct notification.
    let trans: string = '';
    const lang = this.selectedLanguage;
    console.log('test!@#: ', lang);
    if (lang === 'ua' || !lang) {
      trans = "Параметр 'Тема сайту'";
    } else if (lang === 'en') {
      trans = 'Site theme option';
    }

    value = document.querySelector(`option[value='${value}']`)!.innerHTML;
    this.notificationService.createSmthWasChangedNotification(trans, value);
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
    }

    value = document.querySelector(`option[value='${value}']`)!.innerHTML;
    this.notificationService.createSmthWasChangedNotification(trans, value);
  }
}
