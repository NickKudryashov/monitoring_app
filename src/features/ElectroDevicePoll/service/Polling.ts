import $api from "shared/api";
export interface TaskResponse {
    result:boolean;
}

export interface TaskRequest {
    task_id:string;
}
export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<TaskRequest>(`electropoll/${id}`);
    }

    static async bulkPollDevice(ids:number[]){
        return $api.post<TaskRequest>("heatpoll",{dev_ids:ids});
    }

    static async getTaskStatus(id:number,task_id:string) {
        return $api.put<TaskResponse>(`electropoll/${id}`,{task_id:task_id});
    }
}