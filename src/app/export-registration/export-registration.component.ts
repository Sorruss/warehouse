import { Component, OnInit } from '@angular/core';

import { Item } from '../items';

@Component({
  selector: 'app-export-registration',
  templateUrl: './export-registration.component.html',
  styleUrls: ['./export-registration.component.css'],
})
export class ExportRegistrationComponent implements OnInit {
  public items: Item[] = [];

  public isAllChecked: boolean = false;
  public counter: number = 0;

  constructor() {}
  ngOnInit(): void {
    document.querySelectorAll('.checkbox').forEach((checkbox) =>
      checkbox.addEventListener('change', () => {
        if ((checkbox as HTMLInputElement).checked) {
          this.counter++;
        } else {
          this.counter--;
        }
      })
    );
  }

  chooseAll(): void {
    document.querySelectorAll('.checkbox').forEach((checkbox) => {
      this.check((checkbox as HTMLInputElement).checked, !this.isAllChecked);
      (checkbox as HTMLInputElement).checked = !this.isAllChecked;
    });
  }
  chooseOne(checked: boolean): void {
    if (checked) {
      this.counter++;
    } else {
      this.counter--;
    }
  }
  check(prev: boolean, curr: boolean): void {
    if (prev && curr) {
      ('do nothing');
    } else if (!prev && curr) {
      this.counter++;
    } else if (!prev && !curr) {
      ('do nothing');
    } else if (prev && !curr) {
      this.counter--;
    }
  }
}
