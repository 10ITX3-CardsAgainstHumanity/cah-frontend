import {FormArray, FormControl, FormGroup} from '@angular/forms';

/**
 * Validates a form and marks all controls as touched to display
 * their error message if it is still empty
 * @access public
 * @export
 * @const
 * @param  {FormGroup} form
 * @return {void}
 */
export const validateForm = (form: FormGroup): void => {
  for (const controlName in form.controls) {
    if (form.controls.hasOwnProperty(controlName)) {
      const control = form.controls[controlName];
      if (control instanceof FormGroup) {
        validateForm(control as FormGroup);
      } else if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof  FormArray) {
        control.markAsTouched({ onlySelf: true });
      }
    }
  }
};
