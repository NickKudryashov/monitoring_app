import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeatDevice } from "../types/type";
import { getDevices } from "./actionCreator";

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
        }
    }
});

export const heatDeviceReducer = heatDeviceSlice.reducer;