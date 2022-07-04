import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ObservablesService } from 'src/app/services/observables/observables.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent implements OnInit {
  @Input() modalTitle!: string;

  @Output() onSaveEvent = new EventEmitter<string>();
  @Output() onCloseEvent = new EventEmitter();

  constructor(private observablesService: ObservablesService) {}
  ngOnInit(): void {
    this.observablesService.isModal.next(true);
  }

  onSave(value: string): void {
    this.onSaveEvent.emit(value);
    this.observablesService.isModal.next(false);
  }
  onClose(): void {
    this.onCloseEvent.emit();
    this.observablesService.isModal.next(false);
  }
}
