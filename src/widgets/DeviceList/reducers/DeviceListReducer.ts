import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem, CategoryResponse } from "entities/Category";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { ElectroNodeData } from "entities/ElectroNodes";
import type { HeatDevice } from "entities/Heatcounters";
import { HeatNodeResponse } from "entities/HeatNodes";
import { ObjectItem, ObjectResponse } from "entities/Objects";


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
    isElectroNode?:SelectedItem;
    isElectroDevice?:SelectedItem;
    isHeatDevice?:SelectedItem;
    isHeatNode?:SelectedItem;
}

const initialState:DeviceListState = {
    currentHeatDevice:undefined,
    currentElectroDevice:undefined,
    currentElectroNode:undefined,
    currentHeatNode:undefined,
    currentObject:undefined,
    currentCategory:undefined,
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
            state.currentObject=action.payload;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
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
        },
        setIsHeatDev(state) {
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
        },
        setIsHeatNode(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=true;
        },
        setIsElNode(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=true;
            state.isHeatNode=false;
        },
        setIsElDev(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=true;
            state.isElectroNode=false;
            state.isHeatNode=false;
        },
        setNotSelected(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isElectroNode=false;
            state.isHeatNode=false;
        },
    }
});
export const deviceListReducer = deviceListSlice.reducer;
export const deviceListActions = deviceListSlice.actions;