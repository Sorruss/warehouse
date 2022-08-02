import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

import { fadeIn } from 'src/app/animations/animations';

import { ImportRegistrationService } from 'src/app/services/import-registration/import-registration.service';

// @ts-ignore
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { getCurrentDateTime, loadFile } from 'src/app/functions';

@Component({
  selector: 'app-registrate-import-order',
  templateUrl: './registrate-import-order.component.html',
  styleUrls: ['./registrate-import-order.component.css'],
  animations: [fadeIn],
})
export class RegistrateImportOrderComponent implements OnInit {
  public order!: any;
  public nameToFilter: string = '';

  private id!: number;

  constructor(
    private importRegistrationService: ImportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private translateService: TranslateService
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
    this.importRegistrationService.get(this.id).subscribe({
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
          quantity: model.ritem_quantity + model.ordered_quantity,
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
    this.importRegistrationService.delete(this.id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  registerImport(): void {
    this.changeItemsQuantity();
    this.deleteOrder();
  }

  downloadDOCX(): void {
    let templatePath: string = '';
    const lang = this.translateService.currentLang;
    if (lang === 'ua') {
      templatePath =
        '../../../static/other/templates/ua/registrate_import_order_template.docx';
    } else if (lang === 'en') {
      templatePath =
        '../../../static/other/templates/en/registrate_import_order_template.docx';
    } else if (lang === 'pl') {
      templatePath =
        '../../../static/other/templates/pl/registrate_import_order_template.docx';
    }

    loadFile(templatePath, (error: any, content: any) => {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const dateFile = this.order.income_date.split(' ').join('_');
      const dateDocument = this.order.income_date;

      const user = this.authService.getUserDetails();
      const userFullname = user.first_name + ' ' + user.last_name;
      doc.render({
        order_name: this.order.order_name,
        items: this.order.RegistrationModels,
        dateDocument,
        userFullname,
      });

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      let filename = this.order.order_name.split(' ').join('_');
      if (lang === 'ua') {
        filename += `(імпорт)_${dateFile}.docx`;
      } else if (lang === 'en') {
        filename += `(import)_${dateFile}.docx`;
      }

      this.notificationService.createDOCXFileCreatedNotification(true);
      saveAs(out, filename);
    });
  }
}
