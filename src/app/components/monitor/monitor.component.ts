import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { DatePickerModule } from 'primeng/datepicker';
import type { ChartOptions } from 'components-design';
import 'components-design';
import { CoolingSystemMockDataService } from '../../services/cooling-system-mock-data.service';
import { CoolingSystemEntry } from '../../services/models/cooling-system.model';
import { getTodayEdgeDate, toDateKey } from '../../shared/utils/date-functions';
import { TranslationService } from '../../core/i18n/translate.service';

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
  readonly translationService = inject(TranslationService);

  protected readonly rangeForm = this.fb.group({
    range: [[getTodayEdgeDate('start'), getTodayEdgeDate('end')]],
  });

  private readonly rangeValue = toSignal(
    this.rangeForm.valueChanges.pipe(startWith(this.rangeForm.value)),
    { initialValue: this.rangeForm.value },
  );

  protected readonly chartOptions = computed<ChartOptions | undefined>(() => {
    this.translationService.locale();
    const [from, to] = this.rangeValue().range ?? [];

    if (!from && !to) {
      return undefined;
    }

    const entries = this.mockData.getData(toDateKey(from), toDateKey(to));
    return this.buildChartOptions(entries);
  });

  private buildChartOptions(entries: CoolingSystemEntry[]): ChartOptions {
    const temperatureLabel = this.translationService.translate(
      'monitor.chartAxisTemperature',
    );
    const pressureLabel = this.translationService.translate(
      'monitor.chartAxisPressure',
    );

    const axes = [
      {
        name: temperatureLabel,
        displayedName: temperatureLabel,
        seriesName: 'temperature' as const,
        yAxisIndex: 0,
        symbol: '°C',
        color: '#eb6a25',
      },
      {
        name: pressureLabel,
        displayedName: pressureLabel,
        seriesName: 'pressure' as const,
        yAxisIndex: 1,
        symbol: 'Pa',
        color: '#0ea5e9',
      },
    ];

    return {
      title: this.translationService.translate('monitor.chartTitle'),
      axes,
      series: axes.map((axis) => ({
        name: axis.seriesName,
        type: 'line',
        color: axis.color,
        yAxisIndex: axis.yAxisIndex,
        data: entries.map(
          (entry) => [entry.date, entry[axis.seriesName]] as [string, number],
        ),
      })),
    };
  }
}
