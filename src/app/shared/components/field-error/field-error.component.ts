import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  standalone: true,
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.scss',
})
export class FieldErrorComponent {
  @Input() control: AbstractControl | null | undefined;

  get errorMessages() {
    if (!this.control?.touched) {
      return [];
    }
    const messages: string[] = [];
    for (const errorKey in this.control.errors) {
      switch (errorKey) {
        case 'required':
          messages.push('This field is required');
          break;
      }
    }
    return messages;
  }
}
