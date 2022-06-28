import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent implements OnInit {
  @Input() modalTitle!: string;

  @Output() onSaveEvent = new EventEmitter<string>();
  @Output() onCloseEvent = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  onSave(value: string): void {
    this.onSaveEvent.emit(value);
  }
  onClose(): void {
    this.onCloseEvent.emit();
  }
}
