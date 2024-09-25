import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  mustMatch(controlName: string, matchControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const control = formGroup.get(controlName);
      const matchControl = formGroup.get(matchControlName);


      if (matchControl?.errors && !matchControl.errors['mustMatch'])
        return null;

      if (control?.value !== matchControl?.value) {
        matchControl?.setErrors({ mustMatch: true });
        return { mustMath: true };
      }
      else {
        matchControl?.setErrors(null);
        return null;
      }
    };
  }

}
