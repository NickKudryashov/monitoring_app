
export interface ParameterDataRecord {
    datetime:number;
    value:number;
}

export interface ParameterDataSet {
    name:string;
    id:number;
    data:ParameterDataRecord[]
}

export interface ChartStateSchema {
    datasets:ParameterDataSet[]
}