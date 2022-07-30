import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { fadeIn, slide2right } from 'src/app/animations/animations';

import { ExportRegistrationService } from 'src/app/services/export-registration/export-registration.service';

// @ts-ignore
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { getCurrentDateTime, loadFile } from 'src/app/functions';

@Component({
  selector: 'app-registrate-export-order',
  templateUrl: './registrate-export-order.component.html',
  styleUrls: ['./registrate-export-order.component.css'],
  animations: [fadeIn, slide2right],
})
export class RegistrateExportOrderComponent implements OnInit {
  public order!: any;
  public nameToFilter: string = '';

  private id!: number;

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveOrder();

    this.filterService.filterPropObs.subscribe((value) => {
      this.nameToFilter = value;
    });
    this.filterService.activateSearchBar();
  }

  retrieveOrder(): void {
    this.exportRegistrationService.get(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.order = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeItemsQuantity(): void {
    for (let model of this.order.RegistrationModels) {
      this.itemsService
        .patch(model.ritem_id, {
          quantity: model.ritem_quantity - model.ordered_quantity,
        })
        .subscribe(
          (response) => {
            console.log('response: ', response);
          },
          (error) => {
            console.log('error: ', error);
          }
        );
    }
  }
  deleteOrder(): void {
    this.exportRegistrationService.delete(this.id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  registerExport(): void {
    this.changeItemsQuantity();
    this.deleteOrder();
  }

  downloadDOCX(): void {
    loadFile(
      '../../../static/other/registrate_import_order_template.docx',
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        const { dateFile, dateDocument } = getCurrentDateTime();

        doc.render({
          order_name: this.order.order_name,
          items: this.order.RegistrationModels,
          dateDocument,
        });

        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        this.notificationService.createDOCXFileCreatedNotification(true);
        saveAs(
          out,
          `${this.order.order_name
            .split(' ')
            .join('_')}(експорт)_${dateFile}.docx`
        );
      }
    );
  }
}
