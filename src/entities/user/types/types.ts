export interface DefaultAuthResponse {
    access:string;
    refresh:string;
}

export interface DefaultAuthRequestData {
    email:string;
    password:string;
    is_chat_enabled?:boolean;
}

export interface DefaultAuthCheckResponse {
    access:string;
}
