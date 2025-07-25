import $api from "shared/api";
import { ObjectResponse } from "../types/types";

export class ObjectService {
    static async getObjects () {
        return $api.get<ObjectResponse[]>("objects");
    }

    static async deleteObj(id:number) {
        return $api.delete(`objects/${id}`);
    }
}