export interface TaskResponse {
    result:boolean;
    events?:string[];
}

export interface TaskRequest {
    task_id:string;
}