export interface PidsIds {
    [s:number]:number[];
}

export interface ObjectResponse {
    name:string;
    id:number;
    category:number;
    pids_with_ids?:PidsIds
    cats:number[]
}