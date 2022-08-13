import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DirectAccessGuard {
  private user: any;

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getUserDetails();
  }

  guard(first: any, second: any = ''): void {
    if (!second) {
      second = this.user.company_id;
    }

    if (!(first === second)) {
      this.router.navigate(['']);
    }
  }
}
