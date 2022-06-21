import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
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
