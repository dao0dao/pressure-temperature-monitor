import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject } from 'rxjs';
import { CoolingSystemEntry, CoolingSystemMockDataService } from '../../services/cooling-system-mock-data.service';
import { FieldErrorComponent } from '../../shared/components/field-error/field-error.component';
import { toDateTimeKey } from '../../shared/utils/date.util';

interface RowFormControls {
  date: Date | null;
  temperature: number | null;
  pressure: number | null;
}

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, InputNumberModule, DatePickerModule, ButtonModule, FieldErrorComponent],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss',
})
export class AddDataComponent {
  private readonly mockData = inject(CoolingSystemMockDataService);
  private readonly fb = inject(FormBuilder);
  
  private readonly feedbackSubject = new BehaviorSubject<string | null>(null);
  protected readonly feedback$ = this.feedbackSubject.asObservable();

  protected readonly rootForm = this.fb.group({
    rows: this.fb.array([this.createRowGroup()]),
  });

  protected get rows(): FormArray<FormGroup> {
    return this.rootForm.get('rows') as FormArray<FormGroup>;
  }

  protected canAddRow(): boolean {
    const lastRow = this.rows.at(this.rows.length - 1);
    return lastRow.valid;
  }

  addRow(): void {
    if (!this.canAddRow()) {
      return;
    }
    this.rows.push(this.createRowGroup());
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  onSubmit(): void {
    if (this.rootForm.invalid) {
      this.rootForm.markAllAsTouched();
      return;
    }
    const entries = this.getMappedFormValueToEntries();
    this.mockData.addEntries(entries);
  }

  private getMappedFormValueToEntries(): CoolingSystemEntry[] {
    return this.rows.controls.map((row) => {
      const value = row.value as RowFormControls;
      return {
        date: toDateTimeKey(value.date!),
        temperature: Number(value.temperature!.toFixed(1)),
        pressure: Math.round(value.pressure!),
      };
    });
  }

  private createRowGroup(): FormGroup {
    return this.fb.group({
      date: this.fb.control<Date | null>(null, Validators.required),
      temperature: this.fb.control<number | null>(null, Validators.required),
      pressure: this.fb.control<number | null>(null, Validators.required),
    });
  }
}