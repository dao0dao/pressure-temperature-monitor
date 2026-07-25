import type { AbstractControl } from '@angular/forms';

/** Zwraca komunikaty błędów tylko dla pola, które użytkownik odwiedził (touched) i jest niepoprawne. */
export function fieldErrorMessages(control: AbstractControl | null, label: string): string[] {
  if (!control || !control.errors || !control.touched) {
    return [];
  }

  if (control.errors['required']) {
    return [`${label} is required`];
  }

  return [`${label} is invalid`];
}