import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

import { Item } from 'src/app/interfaces';

const backUrl = 'http://localhost:8080/api/items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.httpClient
      .get<Item[]>(backUrl, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
  get(id: number): Observable<Item> {
    return this.httpClient
      .get<Item>(`${backUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  attach(formData: FormData): Observable<any> {
    return this.httpClient
      .post<any>(`${backUrl}/photo`, formData)
      .pipe(catchError(this.handleError));
  }
  deletePhotoById(id: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${backUrl}/photo/${id}`)
      .pipe(catchError(this.handleError));
  }
  deletePhotoByName(name: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${backUrl}/item_photo/${name}`)
      .pipe(catchError(this.handleError));
  }
  getPhotoByName(name: string): Observable<any> {
    return this.httpClient
      .get<any>(`${backUrl}/item_photo/${name}`)
      .pipe(catchError(this.handleError));
  }
  getPhotoById(id: number): Observable<any> {
    return this.httpClient
      .get<any>(`${backUrl}/photo/${id}`)
      .pipe(catchError(this.handleError));
  }
  create(data: any): Observable<Item> {
    return this.httpClient
      .post<Item>(backUrl, data)
      .pipe(catchError(this.handleError));
  }
  update(id: number, data: any): Observable<Item> {
    return this.httpClient
      .put<Item>(`${backUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }
  patch(id: number, data: any): Observable<Item> {
    return this.httpClient
      .patch<Item>(`${backUrl}/${id}`, data)
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
      errorMessage = `Error (client-side): ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code (server-side): ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
