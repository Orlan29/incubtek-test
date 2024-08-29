import {AbstractControl} from "@angular/forms";

export function getFormControlErrorText(ctrl: AbstractControl): string {
  if (ctrl.touched && ctrl.invalid) {
    if (ctrl.hasError('required'))
      return 'Ce champ est requis';
    else if (ctrl.hasError('email'))
      return 'Adresse e-mail non valide';
    else if (ctrl.hasError('minlength'))
      return `Ce champ requiert une valeur minimale de ${ctrl.errors?.['minlength']['requiredLength']} caractères`;
    else return 'Ce champ contient une erreur';
  }
  return '';
}
