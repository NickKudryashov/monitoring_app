import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem, CategoryResponse } from "entities/Category";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { ElectroNodeData } from "entities/ElectroNodes";
import type { HeatDevice } from "entities/Heatcounters";
import { HeatNodeResponse } from "entities/HeatNodes";
import { ObjectItem, ObjectResponse } from "entities/Objects";
import { PumpDeviceData } from "entities/PumpDevice/model/types/pumpDevice";
import { PumpNode } from "entities/PumpStationNode";


export type CurrentHeatDevice = HeatDevice |undefined;
export type CurrentElectroDevice = TopLevelElectroDevice |undefined;
export type CurrentHeatNode = HeatNodeResponse |  undefined;
export type CurrentElectroNode = ElectroNodeData | undefined;
export type CurrentObject = ObjectItem | undefined;
export type CategoryInList = CategoryItem | undefined;
type SelectedItem = boolean | undefined
export interface DeviceListState{
    currentHeatDevice: CurrentHeatDevice;
    currentElectroDevice: CurrentElectroDevice;
    currentElectroNode: CurrentElectroNode;
    currentHeatNode: CurrentHeatNode;
    currentObject: CurrentObject ;
    currentCategory: CategoryInList;
    currentPumpDevice:PumpDeviceData;
    currentPumpNode:PumpNode;
    isElectroNode?:SelectedItem;
    isElectroDevice?:SelectedItem;
    isHeatDevice?:SelectedItem;
    isHeatNode?:SelectedItem;
    isPumpDevice?:SelectedItem;
    isPumpNode?:SelectedItem;
}

const initialState:DeviceListState = {
    currentHeatDevice:undefined,
    currentElectroDevice:undefined,
    currentElectroNode:undefined,
    currentHeatNode:undefined,
    currentObject:undefined,
    currentCategory:undefined,
    currentPumpDevice:undefined,
    currentPumpNode:undefined
};

export const deviceListSlice = createSlice({
    name:"deviceList",
    initialState,
    reducers:{
        setObject(state,action:PayloadAction<CurrentObject>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=undefined;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=undefined;
            state.currentPumpDevice=undefined;
            state.currentPumpNode=undefined;
            state.currentObject=action.payload;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpDevice=false;
            state.isPumpNode = false;
        },
        setHeatNode(state,action:PayloadAction<HeatNodeResponse>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=undefined;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=action.payload;
            state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=true;
            state.currentPumpDevice=undefined;
            state.currentPumpNode=undefined;
            state.isPumpDevice=false;
            state.isPumpNode = false;


        },
        setElectroNode(state,action:PayloadAction<ElectroNodeData>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=action.payload;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=true;
            state.isHeatNode=false;
            state.currentPumpDevice=undefined;
            state.currentPumpNode=undefined;
            state.isPumpDevice=false;
            state.isPumpNode = false;


        },
        setElectroDevice(state,action:PayloadAction<TopLevelElectroDevice>) {
            state.currentElectroDevice=action.payload;
            state.currentElectroNode=undefined;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=true;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.currentPumpDevice=undefined;
            state.currentPumpNode=undefined;
            state.isPumpDevice=false;
            state.isPumpNode = false;


        },
        setHeatDevice(state,action:PayloadAction<HeatDevice>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=undefined;
            state.currentHeatDevice=action.payload;
            state.currentHeatNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.currentPumpDevice=undefined;
            state.currentPumpNode=undefined;
            state.isPumpDevice=false;
            state.isPumpNode = false;

        },
        setPumpDevice(state,action:PayloadAction<PumpDeviceData>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=undefined;
            state.currentPumpDevice=action.payload;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpDevice=true;
            state.isPumpNode = false;
        },
        setPumpNode(state,action:PayloadAction<PumpNode>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=undefined;
            state.currentPumpNode=action.payload;
            state.currentPumpDevice=undefined;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpDevice=false;
            state.isPumpNode = true;
        },
        setCategory(state,action:PayloadAction<CategoryItem>) {
            state.currentElectroDevice=undefined;
            state.currentElectroNode=undefined;
            state.currentHeatDevice=undefined;
            state.currentHeatNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = action.payload;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.currentPumpDevice=undefined;
            state.currentPumpNode=undefined;
            state.isPumpDevice=false;
            state.isPumpNode = false;

        },
        setIsHeatDev(state) {
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpNode=false;
            state.isPumpDevice=false;
        },
        setIsHeatNode(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=true;
            state.isPumpNode=false;
            state.isPumpDevice=false;

        },
        setIsPumpDev(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpNode=false;
            state.isPumpDevice=true;

        },
        setIsPumpNode(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpNode=true;
            state.isPumpDevice=false;

        },
        setIsElNode(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=true;
            state.isHeatNode=false;
            state.isPumpNode=false;
            state.isPumpDevice=false;

        },
        setIsElDev(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=true;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpNode=false;
            state.isPumpDevice=false;

        },
        setNotSelected(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
            state.isPumpNode=false;
            state.isPumpDevice=false;

        },
    }
});
export const deviceListReducer = deviceListSlice.reducer;
export const deviceListActions = deviceListSlice.actions;