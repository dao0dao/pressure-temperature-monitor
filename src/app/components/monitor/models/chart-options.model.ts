import { CoolingSystemEntry } from "../../../services/models/cooling-system.model";

interface CharConfigAxis {
    name: string,
    displayedName: string,
    seriesName: string
    yAxisIndex: number,
    symbol: string
    color: string
}

export interface ChartConfigData {
    axes: CharConfigAxis[]
    entries: CoolingSystemEntry[]
    title: string;
}