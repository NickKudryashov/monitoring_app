import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryResponse } from "entities/Category";
import type { HeatDevice } from "entities/Heatcounters";
import { HeatNodeResponse } from "entities/HeatNodes";
import { ObjectResponse } from "entities/Objects";


type CurrentDevice = HeatDevice | undefined;
type CurrentNode = HeatNodeResponse | undefined;
type CurrentObject = ObjectResponse | undefined;
type CategoryInList = CategoryResponse | undefined;

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
        setCategory(state,action:PayloadAction<CategoryResponse>) {
            state.currentDevice=undefined;
            state.currentNode=undefined;
            state.currentObject=undefined;
            state.currentCategory = action.payload;

        },
    }
});

export const deviceListReducer = deviceListSlice.reducer;