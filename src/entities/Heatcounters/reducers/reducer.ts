import { createEntityAdapter, createSlice, PayloadAction, Update } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { bulkSortParameters, sortParameters } from "../lib/parametersOrder";
import { HeatDevice, HeatDeviceSchema, HeatSystem } from "../types/type";
import { deleteDevice, getDevice, getDevices, refreshDevices } from "./actionCreator";

type SelectedDev = HeatDevice | undefined;

// interface HeatDevicesState {
//     devices:HeatDevice[];
//     selectedDevice:HeatDevice | undefined;
// }


export type selectedDev  = number | undefined;
const selectedDevice:selectedDev = undefined;
const heatCounterAdapter = createEntityAdapter<HeatDevice>();
const initialState = heatCounterAdapter.getInitialState<HeatDeviceSchema>({selectedDeviceID:undefined,ids:[],entities:{}});
// const initialState:HeatDevicesState = {devices:[],selectedDevice:undefined};
export const {selectById:selectHeatDeviceById } = heatCounterAdapter.getSelectors<StateSchema>(
    (state) => state.heatDevices || heatCounterAdapter.getInitialState(),
);

export const heatDeviceSlice = createSlice({
    name:"heatDevice",
    initialState,
    reducers:{
        selectdevice(state,action:PayloadAction<SelectedDev>) {
            state.selectedDeviceID=action.payload.id;
        },
        unselectdevice(state) {
            state.selectedDeviceID=undefined;
        },
        updateOne(state,action:PayloadAction<HeatDevice>) {
            state.entities[action.payload.id] = action.payload;
        }
    },
    extraReducers:{
        [getDevices.fulfilled.type] : (state,action: PayloadAction<HeatDevice[]>)=>{
            // state.devices=action.payload;
            // state.devices = state.devices.map(device=>{
            //     const newSystems:HeatSystem[] = device.systems.map((system)=> ({...system,parameters:sortParameters(system.parameters)}));
            //     console.log(newSystems);
            //     device.systems = newSystems;
            //     return device;
            // });

            heatCounterAdapter.addMany(state,bulkSortParameters(action.payload));
        },
        [refreshDevices.fulfilled.type] : (state,action: PayloadAction<HeatDevice[]>)=>{
            // state.devices=action.payload;
            // state.devices = state.devices.map(device=>{
            //     const newSystems:HeatSystem[] = device.systems.map((system)=> ({...system,parameters:sortParameters(system.parameters)}));
            //     console.log(newSystems);
            //     device.systems = newSystems;
            //     return device;
            // });

            heatCounterAdapter.updateMany(state,action.payload.map(device=>({id:device.id,changes:sortParameters(device)})));
        },
        [getDevice.fulfilled.type]: (state,action:PayloadAction<HeatDevice>)=>{
            console.log("гет");
            // const newSystems = action.payload.systems.map(system=>{
            //     const temp = {...system,parameters:sortParameters(system.parameters)};
            //     console.log(temp);
            //     return temp ;
            // });
            heatCounterAdapter.updateOne(state,{id:action.payload.id,changes:{...sortParameters(action.payload)}});
        },
        [deleteDevice.fulfilled.type]: (state,action:PayloadAction<number>)=>{
            heatCounterAdapter.removeOne(state,action.payload); 
        }
    }
});

export const heatDeviceReducer = heatDeviceSlice.reducer;
// export const getHeatDevices = heatCounterAdapter.getSelectors(
//     (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
// );