import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortParameters } from "../lib/parametersOrder";
import { HeatDevice, HeatSystem } from "../types/type";
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
            state.devices=action.payload;
            state.devices = state.devices.map(device=>{
                const newSystems:HeatSystem[] = device.systems.map((system)=> ({...system,parameters:sortParameters(system.parameters)}));
                console.log(newSystems);
                device.systems = newSystems;
                return device;
            });
        },
        [getDevice.fulfilled.type]: (state,action:PayloadAction<HeatDevice>)=>{
            console.log("гет");
            const newSystems = action.payload.systems.map(system=>{
                const temp = {...system,parameters:sortParameters(system.parameters)};
                console.log(temp);
                return temp ;
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