import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import $api from "shared/api";
export interface TaskResponse {
    result:boolean;
    events?:string[];
}

export interface TaskRequest {
    task_id:string;
}

interface BusyReq {
    busy:boolean;
}
export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<TaskRequest>(`electropoll/${id}`);
    }

    static async bulkPollDevice(node_id:number){
        return $api.post<TaskRequest>("bulk_electropoll/"+node_id,{node_id});
    }

    static async getTaskStatusBulk(id:number,task_id:string) {
        return $api.put<TaskResponse>(`bulk_electropoll/${id}`,{task_id:task_id});
    }
    static async getTaskStatus(id:number,task_id:string) {
        return $api.put<TaskResponse>(`electropoll/${id}`,{task_id:task_id});
    }
    static async getBusyStatus(id:number) {
        return $api.get<BusyReq>(`electro_node_busy/${id}`);
    }
}