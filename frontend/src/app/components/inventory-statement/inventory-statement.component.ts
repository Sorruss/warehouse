import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items/items.service';
import { FilterService } from 'src/app/services/filter/filter.service';

// @ts-ignore
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { getCurrentDateTime, loadFile } from 'src/app/functions';

@Component({
  selector: 'app-inventory-statement',
  templateUrl: './inventory-statement.component.html',
  styleUrls: ['./inventory-statement.component.css'],
})
export class InventoryStatementComponent implements OnInit {
  public items: any[] = [];

  constructor(
    private itemsService: ItemsService,
    private filterService: FilterService
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

        saveAs(out, `інвентарна_відомість_${dateFile}.docx`);
      }
    );
  }
}
