import { Injectable } from '@angular/core';

import { NgModel } from '@angular/forms';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated: Subject<boolean> = new Subject<boolean>();
  public isAuthenticatedObs: Observable<boolean> =
    this.isAuthenticated.asObservable();

  constructor() {}
  authentication(credentials: {
    companyId: NgModel;
    companyPassword: NgModel;
    workerLogin: NgModel;
    workerPassword: NgModel;
  }): boolean {
    if (credentials.companyId.control.value === '6666666') {
      return false;
    }
    this.authorization();
    return true;
  }
  authorization(): void {
    this.isAuthenticated.next(true);
  }
  exit(): void {
    this.isAuthenticated.next(false);
  }
}
