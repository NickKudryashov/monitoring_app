import $api from "shared/api";
export interface TaskResponse {
    result:boolean;
}

export interface TaskRequest {
    task_id:string;
}
export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<TaskRequest>(`automatic_device/${id}/poll`);
    }

    static async getTaskStatus(id:number,task_id:string) {
        return $api.put<TaskResponse>(`automatic_device/${id}/poll`,{task_id:task_id});
    }
}