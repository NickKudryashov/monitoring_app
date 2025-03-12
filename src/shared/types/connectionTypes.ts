export type Connections = 'TCP' | 'UDP' | 'GSM'

export interface GSMConnection {
    connection_type:'GSM'
    phonenumber:string;
}

export interface InternetConnection {
    connection_type:'TCP' | 'UDP'
    ip:string;
    port:string
}