import { Injectable } from '@angular/core';
import { Theme, light, dark } from 'src/app/themes';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  constructor(private cookieService: CookieService) {}

  setThemeFromCookie(): void {
    if (this.cookieService.check('theme')) {
      const theme: any = this.cookieService.get('theme');
      if (theme === 'light') {
        this.setLightTheme();
      } else if (theme === 'dark') {
        this.setDarkTheme();
      }
    }
  }

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
