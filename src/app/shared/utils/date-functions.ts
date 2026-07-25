const padStart = (value: number): string => value.toString().padStart(2, '0');

export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(date.getDate())}`;
}

export function toDateTimeKey(date: Date): string {
  const timePart = `${padStart(date.getHours())}-${padStart(date.getMinutes())}-${padStart(date.getSeconds())}`;
  return `${toDateKey(date)} ${timePart}`;
}

export function toEchartsDateString(storedDate: string): string {
  const [datePart, timePart] = storedDate.split(' ');
  return `${datePart} ${timePart.replace(/-/g, ':')}`;
}

export function getTodayEdgeDate(edge: 'start' | 'end'): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (edge === 'end') {
    today.setHours(23, 59, 59, 999);
  }
  return today;
}