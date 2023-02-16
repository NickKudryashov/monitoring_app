import { HeatDevice } from "entities/Heatcounters";
import $api from "shared/api";

export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<HeatDevice>(`heatpoll/${id}`);
    }
}