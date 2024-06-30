export const CANMapper = {
    CAN1:"CAN1",
    CAN2:"CAN2",
    CAN3:"CAN3",
    CAN4:"CAN4",
    RS485:"RS485"
} as const;

export type CANMapper = typeof CANMapper [keyof typeof CANMapper]

export interface CounterByCAN {
    [CAN:string]:ElectroCounter[];
}
export interface CounterIdByCAN {
    [id:number]:CounterByCAN;
}
interface BaseElectroDevice {
    user_object:number;
    id:number;
    name:string;
    device_type:string;
    device_type_verbose_name:string;
    last_update:string;
}

export interface ElectroCounterParameters {
    name:string;
    value:number;
    is_active:boolean;
    dimension:string;
    tag:string;
    device:number;
    id:number;
}

export interface ElectroCounter extends BaseElectroDevice {
    device:number;
    interface:CANMapper;
    device_num?:number;
    inner_id:number;
    inner_adress:number;
    user:number;
    parameters?:ElectroCounterParameters[];
    delta_error?:boolean;
    
}

export interface TopLevelDeviceStatistic {
    // "mercury_200":{"count":210,"success":210,"failed":0,"verbose":"Меркурий 200"
    count:number;
    success:number;
    failed:number;
    verbose:string;
}

export interface TopLevelElectroDevice extends BaseElectroDevice {
    node:number;
    device_num:number;
    subcategory:number;
    password:string;
    is_busy?:boolean;
    autopoll?:boolean;
    interval?:number;
    last_poll_seconds?:number;
    statistic?:Dict<TopLevelDeviceStatistic>
}

export interface DeviceRecord {
    [topLevelId:number]:ElectroCounter[];
}
export interface ElectroData {
    topLevelDevices:TopLevelElectroDevice[];
    countersById:DeviceRecord;
    devicesByCan?:CounterIdByCAN
}
export interface ElectroDeviceSchema {
isLoading?: boolean;
selectedDevice?:TopLevelElectroDevice;
data?: ElectroData;
error?:string;
}

export interface Dict<T> {
    [Key: string]: T;
}

interface ConnectionInfo {
    connection_type:string;
}

export interface GetDeviceQuery {
    node:number;
    device_num:number;
    subcategory:number;
    password:string;
    is_busy?:boolean;
    autopoll?:boolean;
    interval?:number;
    last_poll_seconds?:number;
    statistic?:Dict<TopLevelDeviceStatistic>
    systemCount?:number;
    user_object:number;
    id:number;
    name:string;
    device_type:string;
    device_type_verbose_name:string;
    last_update:string;
    counters_by_can:Dict<ElectroCounter[]>;
    connection_info:ConnectionInfo;
}