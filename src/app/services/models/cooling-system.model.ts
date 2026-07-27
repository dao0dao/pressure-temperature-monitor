export type CoolingSystemValues = Record<string, number>;

export type CoolingSystemEntry = {
  /** Format: yyyy-MM-dd HH:mm:ss */
  date: string;
} & CoolingSystemValues
