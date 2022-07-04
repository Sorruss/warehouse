import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();
    const bool = jwtHelperService.isTokenExpired(<any>token);
    if (token && !bool) {
      return true;
    }

    // navigate to login page
    this.router.navigate(['/entry']);
    this.authService.isAuthenticated.next(false);
    // can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
