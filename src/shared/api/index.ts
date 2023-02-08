import axios from 'axios'

export const API_URL='http://127.0.0.1:8000/api/v1/'

const $api = axios.create({
    withCredentials:true,
    baseURL:API_URL
})

export const $apiClear = axios.create({
    withCredentials:true,
    baseURL:API_URL
})


$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use(
    (config)=>{
        return config;
    }, 
    async (error)=> 
    {
        const originalRequest = error.config;
        if (error.response.status==401 && error.config && !originalRequest._isRetry ) {
            originalRequest._isRetry = true;
            try{
                const refresh = localStorage.getItem('refresh_token')
                const response = await axios.post(`${API_URL}auth-refresh/`,{withCredentials:true,refresh})
                localStorage.setItem('token',response.data.access)
                return $api.request(originalRequest)
            }catch(e) {
                console.log(e)
            }
        }
    }
    )


export default $api
