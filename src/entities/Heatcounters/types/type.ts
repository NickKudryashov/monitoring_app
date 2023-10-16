// {"id":411,"name":"W,тепловая мощность","value":0.233,"is_active":true,"dimension":"Гкал/ч","tag":"W","system":42,"device":41}
// {"id":41,"user_object":22,"node":13,"name":"ЖИЛ","device_num":1915,"device_type":"teross","connection_info":{"ip":"94.231.164.40","port":"2001","connection_type":"TCP"}

import { EntityId, EntityState } from "@reduxjs/toolkit";
import { selectedDev } from "../reducers/reducer";

// {"id":42,"name":"ТС1","index":0,"is_active":true,"device":41,"parameters":
export interface HeatParameters {
    id:number;
    name:string;
    value:number;
    is_active:boolean;
    dimension:string;
    system:number;
    device:number;
    tag?:string;
    comment?:string;
}

export interface HeatSystem {
    id:number;
    name:string;
    index:number;
    is_active:boolean;
    device:number;
    parameters:HeatParameters[];
    schema?:string;
    formula?:string;
}

export interface HeatDevice {
    id:number;
    user_object:number;
    name:string;
    device_num:number;
    device_type:string;
    systems:HeatSystem[];
    last_update:string | null;
    device_type_verbose_name:string;
    subcategory:number;
    interval?:number;
    autopoll?:boolean;
    is_busy?:boolean;
}
interface HeatCounterState {
    devices:HeatDevice[];
    selectedDevice:HeatDevice;
}

export interface HeatDeviceSchema extends EntityState<HeatDevice> {
    selectedDeviceID:EntityId;
}

export interface TaskResponse {
    result:boolean;
}

export interface TaskRequest {
    task_id:string;
}

export interface ArchiveEvent {
    message:string;
    event_datetime:string;
    system:string;
}