import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  ImportRegistrationService,
  IImportRegistrationCont,
} from 'src/app/services/import-registration/import-registration.service';

@Component({
  selector: 'app-registrate-import-order',
  templateUrl: './registrate-import-order.component.html',
  styleUrls: ['./registrate-import-order.component.css'],
})
export class RegistrateImportOrderComponent implements OnInit {
  public order!: IImportRegistrationCont;

  constructor(
    private importRegistrationService: ImportRegistrationService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.importRegistrationService.getItemsById(id);
  }
}
