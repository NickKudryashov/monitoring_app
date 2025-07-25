import $api from "shared/api";
import { HeatNodeResponse } from "../types/types";

export class HeatNodeService{
    static async getHeatNodes() {
        const response = await $api.get<HeatNodeResponse[]>("/heat_node");
        return response;
    }
    static async getHeatNode(id:number) {
        const response = await $api.get<HeatNodeResponse[]>(`heatnode/${id}`);
        return response;
    }
}