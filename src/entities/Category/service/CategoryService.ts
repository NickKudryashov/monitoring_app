import axios from "axios";
import $api, { API_URL } from "shared/api";
import { CategoryResponse } from "../types/types";


export default class CategoryService {
    static async getAllCategories () {
        return $api.get<CategoryResponse[]>("category");
    }
    static async deleteCategory (id:number) {
        return $api.delete<CategoryResponse[]>(`category/${id}`);
    }
}