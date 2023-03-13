import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortParameters } from "../lib/parametersOrder";
import { HeatDevice } from "../types/type";
import { deleteDevice, getDevice, getDevices } from "./actionCreator";

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
            state.devices=action.payload.sort((a,b)=>(a.id-b.id));
        },
        [getDevice.fulfilled.type]: (state,action:PayloadAction<HeatDevice>)=>{
            const newSystems = action.payload.systems.map(system=>{
                return {...system,parameters:sortParameters(system.parameters)};
            });
            state.devices = state.devices.map(device=>{
                if (device.id===action.payload.id) {
                    return {...action.payload,systems:newSystems};} 
                else {
                    return {...device};}});
        },
        [deleteDevice.fulfilled.type]: (state,action:PayloadAction<number>)=>{
            state.devices = state.devices.filter(dev=>dev.id!==action.payload);
        }
    }
});

export const heatDeviceReducer = heatDeviceSlice.reducer;