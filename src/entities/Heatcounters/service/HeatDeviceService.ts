import $api from "shared/api";
import { HeatDevice, TaskRequest, TaskResponse } from "../types/type";

export default class HeatDeviceService{
    static async getAllHeatDevices() {
        return $api.get<HeatDevice[]>("device");
    }
    static async getHeatDevice(id:number){
        return $api.get<HeatDevice>(`device/${id}`);
    }
    static async deleteHeatDevice(id:number){
        return $api.delete<HeatDevice>(`device/${id}`);
    }
    static async renameParameter(id:number,comment:string){
        return $api.post("heat_parameter/"+id,{comment});
    }

    static async editHeatAutoSettings(id:number,interval:number,autopoll:boolean){
        return $api.post("heat/"+id+"/edit",{autopoll_flag:autopoll,interval_minutes:interval});
    }
}


export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<TaskRequest>(`heatpoll/${id}`);
    }

    static async bulkPollDevice(ids:number[]){
        return $api.post<TaskRequest>("heatpoll",{dev_ids:ids});
    }

    static async getTaskStatus(id:number,task_id:string) {
        return $api.put<TaskResponse>(`heatpoll/${id}`,{task_id:task_id});
    }
}