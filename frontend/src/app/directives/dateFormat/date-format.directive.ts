import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

function correctDateValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const correctDate: boolean = nameRe.test(control.value);
    return !correctDate ? { incorrectDate: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appDateFormat]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateFormatDirective,
      multi: true,
    },
  ],
})
export class DateFormatDirective implements Validator {
  private dateRegExpUA: RegExp =
    /^(Липень|Серпень|Вересень|Жовтень|Листопад|Грудень|Січень|Лютий|Березень|Квітень|Травень|Червень) (Понеділок|Вівторок|Середа|Четвер|П'ятниця|Субота|Неділя)\([1-3]?[1-9]\) ([[0-2][0-9]):([0-5][0-9])$/;

  validate(control: AbstractControl): ValidationErrors | null {
    return correctDateValidator(new RegExp(this.dateRegExpUA, 'i'))(control);
  }
}
