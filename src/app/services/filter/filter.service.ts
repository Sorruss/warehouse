import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterProp: Subject<string> = new Subject<string>();
  filterPropObs: Observable<string> = this.filterProp.asObservable();

  constructor() {}
}
