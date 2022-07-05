import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservablesService {
  public isModal: Subject<boolean> = new Subject<boolean>();
  public isModalObs: Observable<boolean> = this.isModal.asObservable();

  public isNewItem: Subject<boolean> = new Subject<boolean>();
  public isNewItemObs: Observable<boolean> = this.isNewItem.asObservable();

  constructor() {}
}
