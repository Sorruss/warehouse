import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

const backUrl = 'http://localhost:8080/api/rmodel';

@Injectable({
  providedIn: 'root',
})
export class RegistrateModelService {
  constructor(private httpClient: HttpClient) {}

  create(data: any): Observable<any> {
    return this.httpClient
      .post<any>(backUrl, data)
      .pipe(catchError(this.handleError));
  }
  delete(id: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${backUrl}/${id}`)
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
