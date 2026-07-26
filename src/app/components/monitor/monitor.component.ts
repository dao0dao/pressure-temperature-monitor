import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePickerModule } from 'primeng/datepicker';
import type { ChartOptions } from 'components-design';
import 'components-design';
import { CoolingSystemMockDataService } from '../../services/cooling-system-mock-data.service';

import { getTodayEdgeDate, toDateKey } from '../../shared/utils/date-functions';
import { buildChartOptions } from '../../shared/utils/chart-options-builder';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-monitor',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, DatePickerModule],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
})
export class MonitorComponent {
  private readonly mockData = inject(CoolingSystemMockDataService);
  private readonly fb = inject(FormBuilder);

  chartOptions = signal<ChartOptions | undefined>(undefined);

  protected readonly rangeForm = this.fb.group({
    range: [[getTodayEdgeDate('start'), getTodayEdgeDate('end')]],
  });

  constructor() {
    this.rangeForm.valueChanges
      .pipe(takeUntilDestroyed(), startWith(this.rangeForm.value))
      .subscribe({
        next: (val) => {
          console.log(val.range)
          if (val.range?.length) {
            const [from, to] = this.rangeForm.value.range ?? [];
            const entries = this.mockData.getData(
              toDateKey(from),
              toDateKey(to),
            );
            this.chartOptions.set(buildChartOptions(entries));
          } else if (!val.range?.length) {
            this.chartOptions.set(undefined);
          }
        },
      });
  }
}
