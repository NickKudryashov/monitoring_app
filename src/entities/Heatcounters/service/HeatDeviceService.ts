import $api from "shared/api"

export default class HeatDeviceService{
    static async getAllHeatDevices() {
        return $api.get<HeatDevice[]>('device');
    }
}
