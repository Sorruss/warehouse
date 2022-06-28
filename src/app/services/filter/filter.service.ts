import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public filterProp: Subject<string> = new Subject<string>();
  public filterPropObs: Observable<string> = this.filterProp.asObservable();

  public isSearchBarActivated: Subject<boolean> = new Subject<boolean>();
  public isSearchBarActivatedObs: Observable<boolean> =
    this.isSearchBarActivated.asObservable();

  constructor() {}
  activateSearchBar(): void {
    this.isSearchBarActivated.next(true);
  }
  hideSearchBar(): void {
    this.isSearchBarActivated.next(false);
  }
}
