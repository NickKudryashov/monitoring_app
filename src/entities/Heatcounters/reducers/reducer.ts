import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeatDevice } from "../types/type";
import { getDevice, getDevices } from "./actionCreator";

interface HeatDevicesState {
    devices:HeatDevice[];
    selectedDevice:HeatDevice | undefined;
}

const initialState:HeatDevicesState = {devices:[],selectedDevice:undefined};

export const heatDeviceSlice = createSlice({
    name:"heatDevice",
    initialState,
    reducers:{},
    extraReducers:{
        [getDevices.fulfilled.type] : (state,action:PayloadAction<HeatDevice[]>)=>{
            state.devices=action.payload;
        },
        [getDevice.fulfilled.type]: (state,action:PayloadAction<HeatDevice>)=>{
            state.devices.map(device=>{device.id===action.payload.id ? {...action.payload} : {...device};});
            console.log("состояние после: ",state.devices);
        }
    }
});

export const heatDeviceReducer = heatDeviceSlice.reducer;