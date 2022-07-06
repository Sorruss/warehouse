import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class InterceptorService {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }
    request = request
      .clone({ headers: request.headers.set('Accept', 'application/json') })
      .clone({
        setHeaders: {
          Authorization: `${this.authService.getToken()}`,
        },
      });

    return next.handle(request);
  }
}
