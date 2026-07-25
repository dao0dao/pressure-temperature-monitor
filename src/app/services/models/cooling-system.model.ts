export interface CoolingSystemValues {
  temperature: number;
  pressure: number;
}

export interface CoolingSystemEntry extends CoolingSystemValues {
  /** Format: yyyy-MM-dd HH:mm:ss */
  date: string;
}
