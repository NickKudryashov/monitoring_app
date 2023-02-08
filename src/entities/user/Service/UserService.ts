import axios from "axios"
import $api, { API_URL } from "shared/api"

interface DefaultAuthResponse {
    access:string;
    refresh:string;
}

export default class UserService {
static async defaultLogin (email:string,password:string) {
    return $api.post<DefaultAuthResponse>('auth/',{email,password})
}

}