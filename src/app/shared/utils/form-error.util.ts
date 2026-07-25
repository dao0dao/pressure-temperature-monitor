import type { AbstractControl } from '@angular/forms';

export function fieldErrorMessages(control: AbstractControl | null, label: string): string[] {
  if (!control || !control.errors || !control.touched) {
    return [];
  }

  if (control.errors['required']) {
    return [`${label} is required`];
  }

  return [`${label} is invalid`];
}