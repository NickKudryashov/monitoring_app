import $api from "shared/api";
import { HeatDevice } from "../types/type";

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
}
