import axios from "axios";
import $api, { API_URL } from "shared/api";
import { UserData } from "../Models/User";
import { DefaultAuthCheckResponse, DefaultAuthResponse } from "../types/types";



export default class UserService {
    static async defaultLogin (email:string,password:string) {
        return $api.post<DefaultAuthResponse>("auth/",{email,password});
    }

    static async checkDefaultLogin () {
        const access_token = localStorage.getItem("access_token");
        let refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) {refresh_token="none";} 
        const response = await axios.post<DefaultAuthCheckResponse>(`${API_URL}auth-refresh/`,{access:access_token,refresh:refresh_token});
        return response;
    }

    static async getUserInfo () {
        const access_token = localStorage.getItem("access_token");
        const response = await $api.get<UserData>(`${API_URL}user/`);
        return response;
    }

    static async getVersion () {
        const access_token = localStorage.getItem("access_token");
        const response = await $api.get<{version:string}>("version");
        return response;
    }

}