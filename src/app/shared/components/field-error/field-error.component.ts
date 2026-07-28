import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [TranslatePipe],
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
          messages.push('errorMessage.requiredField');
          break;
      }
    }
    return messages;
  }
}
