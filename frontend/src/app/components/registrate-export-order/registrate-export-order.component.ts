import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

import { fadeIn } from 'src/app/animations/animations';

import { ExportRegistrationService } from 'src/app/services/export-registration/export-registration.service';

// @ts-ignore
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { loadFile } from 'src/app/functions';
import { TranslateDatePipe } from 'src/app/pipes/translateDate/translate-date.pipe';

@Component({
  selector: 'app-registrate-export-order',
  templateUrl: './registrate-export-order.component.html',
  styleUrls: ['./registrate-export-order.component.css'],
  animations: [fadeIn],
})
export class RegistrateExportOrderComponent implements OnInit, OnDestroy {
  public order!: any;
  public nameToFilter: string = '';

  private id!: number;

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private exportRegistrationService: ExportRegistrationService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private translateService: TranslateService,
    private translateDatePipe: TranslateDatePipe
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveOrder();

    this.filterService.filterPropObs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.nameToFilter = value;
      });
    this.filterService.activateSearchBar();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  retrieveOrder(): void {
    this.exportRegistrationService
      .get(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
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
        .pipe(takeUntil(this.ngUnsubscribe))
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
    this.exportRegistrationService
      .delete(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
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
    let templatePath: string = '';
    const lang = this.translateService.currentLang;
    if (lang === 'ua') {
      templatePath =
        '../../../static/other/templates/ua/registrate_export_order_template.docx';
    } else if (lang === 'en') {
      templatePath =
        '../../../static/other/templates/en/registrate_export_order_template.docx';
    } else if (lang === 'pl') {
      templatePath =
        '../../../static/other/templates/pl/registrate_export_order_template.docx';
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

      const dateDocument = this.translateDatePipe.transform(
        this.order.income_date
      );
      const dateFile = dateDocument.split(' ').join('_');

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
        filename += `(експорт)_${dateFile}.docx`;
      } else if (lang === 'en') {
        filename += `(export)_${dateFile}.docx`;
      } else if (lang === 'pl') {
        filename += `(eksport)_${dateFile}.docx`;
      }

      this.notificationService.createDOCXFileCreatedNotification(true);
      saveAs(out, filename);
    });
  }
}
