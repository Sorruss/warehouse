import { ObservablesService } from './../../../services/observables/observables.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input() modalTitle!: string;
  @Input() modalText!: string;

  @Output() onCloseEvent = new EventEmitter<boolean>();

  constructor(private observablesService: ObservablesService) {}
  ngOnInit(): void {
    this.observablesService.isModal.next(true);
  }

  onClose(result: boolean = false): void {
    this.onCloseEvent.emit(result);
    this.observablesService.isModal.next(false);
  }
}
