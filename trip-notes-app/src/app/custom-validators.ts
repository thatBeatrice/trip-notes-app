import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

  export function dateValidator(startForm: string, endForm: string): ValidatorFn | null {
    return (control:AbstractControl) : ValidationErrors | null => {

    const fromCtrl = control.get(startForm);
    const toCtrl = control.get(endForm);

    return new Date(fromCtrl?.value) > new Date(toCtrl?.value)
      ? { message: 'error message' }
      : null;
  }
  }
