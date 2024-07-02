
export interface ParameterDataRecord {
    datetime:number;
    value:number;
}

export interface ParameterDataSet {
    name:string;
    data:ParameterDataRecord[]
}

export interface ChartStateSchema {
    datasets:ParameterDataSet[]
}