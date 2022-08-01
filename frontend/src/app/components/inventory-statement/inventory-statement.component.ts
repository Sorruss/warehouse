import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

// @ts-ignore
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { getCurrentDateTime, loadFile } from 'src/app/functions';

import { Item } from 'src/app/interfaces';

import { fadeIn } from 'src/app/animations/animations';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
  animations: [fadeIn],
})
export class InventoryStatementComponent implements OnInit {
  public items: Item[] = [];

  constructor(
    private itemsService: ItemsService,
    private filterService: FilterService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.retrieveItems();
    this.filterService.hideSearchBar();
  }

  retrieveItems(): void {
    this.itemsService.getAll().subscribe(
      (data) => {
        this.items = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadDOCX() {
    loadFile(
      '../../../static/other/templates/ua/inventory_statement_template.docx',
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

        const user = this.authService.getUserDetails();
        const userFullname = user.first_name + ' ' + user.last_name;
        doc.render({
          items: this.items,
          dateDocument,
          userFullname,
        });

        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        let filename: string = '';
        const lang = this.translateService.currentLang;
        if (lang === 'ua') {
          filename = `інвентарна_відомість_${dateFile}.docx`;
        } else if (lang === 'en') {
          filename = `inventory_statement_${dateFile}.docx`;
        }

        this.notificationService.createDOCXFileCreatedNotification(true);
        saveAs(out, filename);
      }
    );
  }
}
