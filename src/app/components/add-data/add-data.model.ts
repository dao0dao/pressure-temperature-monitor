export interface AddDataRow {
  date: Date | null;
  temperature: number | null;
  pressure: number | null;
}

export function createEmptyRow(): AddDataRow {
  return { date: null, temperature: null, pressure: null };
}