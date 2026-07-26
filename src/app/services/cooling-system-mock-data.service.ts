import { Injectable } from '@angular/core';
import { mockCoolingSystemData } from './mock.data';
import {
  CoolingSystemEntry,
  CoolingSystemValues,
} from './models/cooling-system.model';

@Injectable({ providedIn: 'root' })
export class CoolingSystemMockDataService {
  private entriesByDate = new Map<string, CoolingSystemValues>(
    mockCoolingSystemData,
  );

  addEntries(entries: CoolingSystemEntry[]): void {
    for (const entry of entries) {
      if (this.entriesByDate.has(entry.date)) {
        continue;
      }
      this.entriesByDate.set(entry.date, {
        temperature: entry.temperature,
        pressure: entry.pressure,
      });
    }
    this.entriesByDate = new Map(
      [...this.entriesByDate.entries()].sort((a, b) =>
        a[0].localeCompare(b[0]),
      ),
    );
  }

  getData(dateFrom: string, dateTo: string): CoolingSystemEntry[] {
    if (!dateFrom && !dateTo) {
      return [];
    }
    return [...this.entriesByDate.entries()]
      .map(([date, values]) => ({ ...values, date }))
      .filter((entry) => {
        const entryDate = entry.date.slice(0, 10);
        if (dateFrom && !dateTo) {
          return entryDate >= dateFrom;
        }
        if (!dateFrom && dateTo) {
          return entryDate <= dateTo;
        }
        return entryDate >= dateFrom && entryDate <= dateTo;
      });
  }

  getAll(): CoolingSystemEntry[] {
    return [...this.entriesByDate.entries()].map(([date, values]) => ({
      ...values,
      date,
    }));
  }
}
