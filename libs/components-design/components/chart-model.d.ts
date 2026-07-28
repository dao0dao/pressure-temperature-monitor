interface ChartAxis {
    name: string;
    symbol?: string;
    yAxisIndex: number;
}
interface ChartSeries {
    name: string;
    type: 'line';
    yAxisIndex: number;
    color: string;
    min?: number;
    max?: number;
    data: [string, number][];
}
export interface ChartOptions {
    title: string;
    axes: ChartAxis[];
    series: ChartSeries[];
}
export {};
