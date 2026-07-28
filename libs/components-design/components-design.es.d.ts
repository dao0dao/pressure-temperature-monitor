declare interface ChartAxis {
    name: string;
    seriesName: string;
    symbol?: string;
    yAxisIndex: number;
}

export declare interface ChartOptions {
    axes: ChartAxis[];
    title: string;
    series: ChartSeries[];
}

declare interface ChartSeries {
    name: string;
    type: 'line';
    yAxisIndex: number;
    color: string;
    min?: number;
    max?: number;
    data: [string, number][];
}

export { }
