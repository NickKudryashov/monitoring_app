export interface PumpDeviceSchema {
isLoading: boolean;
data?: PumpDeviceData[];
error?: string;
task_id?:string;
}

export interface PumpPollResponse {
    task_id:string;
}


export interface PumpDeviceData {
    name:string;
    user_object:number;
    device_num:number;
    device_type:string;
    device_type_verbose_name:string;
    slave_adress:number;
    id:number;
    last_update:string;
    parameters: PumpParameter[]
    subcategory:number;
    autopoll?:boolean;
    interval?:number;
}

export interface PumpParameter {
    id:number;
    value:number;
    device:number;
    tag:string;
    verbose_name:string;
    parameter_group:string;
    parameter_verbose_group:string;

}