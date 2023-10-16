export interface AutomaticDeviceData {
    name:string;
    user_object:number;
    device_num:number;
    device_type:string;
    device_type_verbose_name:string;
    slave_adress:number;
    id:number;
    last_update:string;
    subcategory:number;
    autopoll?:boolean;
    interval?:number;
    parameters:ParameterGroup[]
}

export interface ParameterGroup {
    name:string;
    parameters:PumpParameter[];
    id:number;
}


export interface PumpParameter {
    verbose:number;
    value:number;
    dimension:string;
    id:number;
}