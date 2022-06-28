import { Component, OnInit } from '@angular/core';

import {
  ImportRegistrationService,
  IImportRegistrationElem,
  IImportRegistrationCont,
} from './../../services/import-registration/import-registration.service';

@Component({
  selector: 'app-import-registration',
  templateUrl: './import-registration.component.html',
  styleUrls: ['./import-registration.component.css'],
})
export class ImportRegistrationComponent implements OnInit {
  public items: IImportRegistrationElem = {};

  constructor(private importRegistrationService: ImportRegistrationService) {}
  ngOnInit(): void {
    this.items = this.importRegistrationService.getItems();
  }
  getValues(): IImportRegistrationCont[] {
    return Object.values(this.items);
  }
}
