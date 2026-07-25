import { CoolingSystemValues } from "./models/cooling-system.model";

export const mockCoolingSystemData: [string, CoolingSystemValues][] = Array.from(
  { length: 120 },
  (_, i) => {
    const date = new Date();
    date.setHours(0,0,0,0)
    date.setHours(date.getHours() + i);

    const timestamp = date
      .toISOString()
      .replace("T", " ")
      .slice(0, 19)

    return [
      timestamp,
      {
        temperature: 15 + Math.floor(Math.random() * 40),
        pressure: 1005 + Math.floor(Math.random() * 20),
      },
    ];
  }
);
