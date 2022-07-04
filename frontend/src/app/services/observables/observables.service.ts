import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservablesService {
  public isModal: Subject<boolean> = new Subject<boolean>();
  public isModalObs: Observable<boolean> = this.isModal.asObservable();

  constructor() {}
}
