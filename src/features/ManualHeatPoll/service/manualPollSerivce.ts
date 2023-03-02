import { HeatDevice } from "entities/Heatcounters";
import $api from "shared/api";
import { TaskRequest, TaskResponse } from "../types/types";

export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<TaskRequest>(`heatpoll/${id}`);
    }

    static async getTaskStatus(id:number,task_id:string) {
        return $api.put<TaskResponse>(`heatpoll/${id}`,{task_id:task_id});
    }
}