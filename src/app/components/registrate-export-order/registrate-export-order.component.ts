import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  ExportRegistrationService,
  IExportRegistrationCont,
} from 'src/app/services/export-registration/export-registration.service';

@Component({
  selector: 'app-registrate-export-order',
  templateUrl: './registrate-export-order.component.html',
  styleUrls: ['./registrate-export-order.component.css'],
})
export class RegistrateExportOrderComponent implements OnInit {
  public order!: IExportRegistrationCont;

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.exportRegistrationService.getItemsById(id);
  }
}
