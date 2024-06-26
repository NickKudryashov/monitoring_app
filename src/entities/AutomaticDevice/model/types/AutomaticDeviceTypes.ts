interface ConnInfo {
    connection_type:string;
}

export interface ParamRecord {
    parameters: AutoParameter[];
    name: string;
}


export interface AutomaticDeviceData {
    resultParamGroup:Record<number,ParameterGroup[]>
    systemParamGroup:Record<number,ParameterGroup[]>
    system_params:ParameterGroup[];
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
    connection_info:ConnInfo;
    parameters:ParameterGroup[]
}

export interface ParameterGroup {
    name:string;
    index:number;
    parameters:AutoParameter[];
    id:number;
}


export interface AutoParameter {
    verbose:number;
    system_index:number;
    value:number;
    dimension:string;
    id:number;
    tag:string;
    writable:boolean;
}