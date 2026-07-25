import type { ChartOptions } from 'components-design';
import type { CoolingSystemEntry } from '../../services/cooling-system-mock-data.service';
import { toEchartsDateString } from './date-functions';

export function buildChartOptions(entries: CoolingSystemEntry[]): ChartOptions {
  return {
    title: 'Temperature and pressure over time',
    axes: [
      { name: 'Temperature', yAxisIndex: 0, symbol: '°C' },
      { name: 'Pressure', yAxisIndex: 1, symbol: 'Pa' },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        color: '#eb6a25',
        yAxisIndex: 0,
        data: entries.map((e) => [toEchartsDateString(e.date), e.temperature] as [string, number]),
      },
      {
        name: 'Pressure',
        type: 'line',
        color: '#0ea5e9',
        yAxisIndex: 1,
        data: entries.map((e) => [toEchartsDateString(e.date), e.pressure] as [string, number]),
      },
    ],
  };
}