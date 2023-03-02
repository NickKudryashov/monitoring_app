export interface DefaultAuthResponse {
    access:string;
    refresh:string;
}

export interface DefaultAuthRequestData {
    email:string;
    password:string;
}

export interface DefaultAuthCheckResponse {
    access:string;
}
