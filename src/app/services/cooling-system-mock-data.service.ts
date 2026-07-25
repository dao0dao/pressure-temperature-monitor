import { Injectable } from '@angular/core';
import { mockCoolingSystemData } from './mock.data';

export interface CoolingSystemValues {
  temperature: number;
  pressure: number;
}

export interface CoolingSystemEntry extends CoolingSystemValues {
  /** Format: yyyy-MM-dd HH-mm-ss */
  date: string;
}

export interface AddEntriesResult {
  added: number;
  skipped: number;
}

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
    return [...this.entriesByDate.entries()]
      .map(([date, values]) => ({ ...values, date }))
      .filter((entry) => {
        const entryDate = entry.date.slice(0, 10);
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
