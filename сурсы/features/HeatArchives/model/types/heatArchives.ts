export interface HeatArchivesSchema {
isLoading: boolean;
data?: HeatArchivesRecord[];
error?: string;
}


export interface HeatArchivesRecord {
    name:string;
    id:number;
    formula:string;
    schema:string;
    start_date:string;
    end_date:string;
    count:number;
}

export interface HeatArchiveAnswer {
    id:number;
    start_date:string;
    end_date:string;
    count:number;

}