import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeatDevice } from "../types/type";
import { getDevice, getDevices } from "./actionCreator";

type SelectedDev = HeatDevice | undefined;

interface HeatDevicesState {
    devices:HeatDevice[];
    selectedDevice:HeatDevice | undefined;
}

const initialState:HeatDevicesState = {devices:[],selectedDevice:undefined};

export const heatDeviceSlice = createSlice({
    name:"heatDevice",
    initialState,
    reducers:{
        selectdevice(state,action:PayloadAction<SelectedDev>) {
            state.selectedDevice=action.payload;
        }
    },
    extraReducers:{
        [getDevices.fulfilled.type] : (state,action:PayloadAction<HeatDevice[]>)=>{
            state.devices=action.payload;
        },
        [getDevice.fulfilled.type]: (state,action:PayloadAction<HeatDevice>)=>{
            state.devices.map(device=>{device.id===action.payload.id ? {...action.payload} : {...device};});
        }
    }
});

export const heatDeviceReducer = heatDeviceSlice.reducer;