export type CoolingSystemValues = Record<string, number>;

export interface CoolingSystemEntry  {
  /** Format: yyyy-MM-dd HH:mm:ss */
  date: string;
  values: CoolingSystemValues
} 
