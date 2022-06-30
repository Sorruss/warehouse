import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNgNumber]',
})
export class NgNumberDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent>event;
    if (
      ['Delete', 'Backspace', 'Tab', 'Escape', 'Enter'].indexOf(e.key) !== -1 ||
      // Allow: Ctrl+A
      (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'End'
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.code < 'Digit0' || e.code > 'Digit9') &&
      (e.code < 'Numpad0' || e.code > 'Numpad9')
    ) {
      e.preventDefault();
    }
  }
  constructor() {}
}
