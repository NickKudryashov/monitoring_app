export interface PumpDeviceSchema {
isLoading: boolean;
data?: PumpDeviceData[];
error?: string;
task_id?:string;
}


export interface PumpDeviceData {
    name:string;
    user_object:number;
    device_num:number;
    device_type:string;
    device_type_verbose_name:string;
    slave_adress:number;
    node:number;
    id:number;
    last_update:string;
    parameters: PumpParameter[]
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