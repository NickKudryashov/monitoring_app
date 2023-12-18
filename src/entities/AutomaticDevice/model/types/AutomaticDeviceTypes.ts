export interface AutomaticDeviceData {
    system_params:Record<number,PumpParameter[]>;
    name:string;
    system_count:number;
    user_object:number;
    device_num:number;
    device_type:string;
    device_type_verbose:string;
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
    system_index:number;
    parameters:PumpParameter[];
    id:number;
}


export interface PumpParameter {
    verbose:number;
    system_index:number;
    value:number;
    dimension:string;
    id:number;
    tag:string;
    writable:boolean;
}