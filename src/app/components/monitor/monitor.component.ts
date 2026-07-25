import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import type { ChartOptions } from 'components-design';
import 'components-design';
import { CoolingSystemMockDataService } from '../../services/cooling-system-mock-data.service';

import { getTodayEdgeDate, toDateKey } from '../../shared/utils/date.util';
import { buildChartOptions } from '../../shared/utils/chart-options.util';

@Component({
  selector: 'app-monitor',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, DatePickerModule],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent {
  private readonly mockData = inject(CoolingSystemMockDataService);
  private readonly fb = inject(FormBuilder);

  protected readonly rangeForm = this.fb.group({
    range: [[getTodayEdgeDate('start'), getTodayEdgeDate('end')]],
  });

  protected chartOptions(): ChartOptions {
    const [from, to] = this.rangeForm.value.range ?? [];
    const entries =
      from && to
        ? this.mockData.getData(toDateKey(from), toDateKey(to))
        : this.mockData.getAll();
    return buildChartOptions(entries);
  }
}
