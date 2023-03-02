import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem, CategoryResponse } from "entities/Category";
import type { HeatDevice } from "entities/Heatcounters";
import { HeatNodeResponse } from "entities/HeatNodes";
import { ObjectItem, ObjectResponse } from "entities/Objects";


export type CurrentDevice = HeatDevice | undefined;
export type CurrentNode = HeatNodeResponse | undefined;
export type CurrentObject = ObjectItem | undefined;
export type CategoryInList = CategoryItem | undefined;

export interface DeviceListState{
    currentDevice: CurrentDevice;
    currentNode: CurrentNode;
    currentObject: CurrentObject ;
    currentCategory: CategoryInList;
}

const initialState:DeviceListState = {
    currentDevice:undefined,
    currentNode:undefined,
    currentObject:undefined,
    currentCategory:undefined,
};

export const deviceListSlice = createSlice({
    name:"deviceList",
    initialState,
    reducers:{
        setObject(state,action:PayloadAction<CurrentObject>) {
            state.currentDevice=undefined;
            state.currentNode=undefined;
            state.currentObject=action.payload;
            state.currentCategory = undefined;
        },
        setNode(state,action:PayloadAction<CurrentNode>) {
            state.currentDevice=undefined;
            state.currentNode=action.payload;
            state.currentObject=undefined;
            state.currentCategory = undefined;

        },
        setDevice(state,action:PayloadAction<CurrentDevice>) {
            state.currentDevice=action.payload;
            state.currentNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = undefined;

        },
        setCategory(state,action:PayloadAction<CategoryItem>) {
            state.currentDevice=undefined;
            state.currentNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = action.payload;

        },
    }
});

export const deviceListReducer = deviceListSlice.reducer;