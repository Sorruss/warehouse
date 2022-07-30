import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

// @ts-ignore
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { getCurrentDateTime, loadFile } from 'src/app/functions';

import { Item } from 'src/app/interfaces';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
})
export class InventoryStatementComponent implements OnInit {
  public items: Item[] = [];

  constructor(
    private itemsService: ItemsService,
    private filterService: FilterService,
    private notificationService: NotificationService
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
      '../../../static/other/inventory_statement_template.docx',
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
          items: this.items,
          dateDocument,
        });

        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        this.notificationService.createDOCXFileCreatedNotification(true);
        saveAs(out, `інвентарна_відомість_${dateFile}.docx`);
      }
    );
  }
}
