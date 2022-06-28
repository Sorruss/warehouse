import { Component, OnInit } from '@angular/core';

import {
  ExportRegistrationService,
  IExportRegistrationElem,
  IExportRegistrationCont,
} from './../../services/export-registration/export-registration.service';

@Component({
  selector: 'app-export-registration',
  templateUrl: './export-registration.component.html',
  styleUrls: ['./export-registration.component.css'],
})
export class ExportRegistrationComponent implements OnInit {
  public items: IExportRegistrationElem = {};

  constructor(private exportRegistrationService: ExportRegistrationService) {}
  ngOnInit(): void {
    this.items = this.exportRegistrationService.getItems();
  }
  getValues(): IExportRegistrationCont[] {
    return Object.values(this.items);
  }
}
