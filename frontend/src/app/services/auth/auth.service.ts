import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { Observable, catchError, throwError, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const backUrl = 'http://localhost:8080/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated: Subject<boolean> = new Subject<boolean>();
  public isAuthenticatedObs: Observable<boolean> =
    this.isAuthenticated.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(payload: object): Observable<any> {
    return this.httpClient
      .post(`${backUrl}/login`, payload, {
        withCredentials: true,
      })
      .pipe(
        map((res: any) => {
          this.isAuthenticated.next(true);
          return res;
        })
      )
      .pipe(catchError(this.handleError));
  }
  logout(): void {
    this.isAuthenticated.next(false);
    this.clearStorage();
    this.cookieService.deleteAll();
    this.router.navigate(['/entry']);
  }

  getUserDetails() {
    if (localStorage.getItem('userData')) {
      return JSON.parse(<any>localStorage.getItem('userData'));
    } else {
      return null;
    }
  }
  setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    localStorage.clear();
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error (client-side error): ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code (server-side error): ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
