import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

const backUrl = 'http://localhost:8080/api/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get<any>(backUrl).pipe(catchError(this.handleError));
  }
  get(id: number): Observable<any> {
    return this.httpClient
      .get<any>(`${backUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  create(data: any): Observable<any> {
    return this.httpClient
      .post<any>(backUrl, data)
      .pipe(catchError(this.handleError));
  }
  update(id: number, data: any): Observable<any> {
    return this.httpClient
      .put<any>(`${backUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }
  delete(id: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${backUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  patch(id: number, data: any): Observable<any> {
    return this.httpClient
      .patch<any>(`${backUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
