import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem, CategoryResponse } from "entities/Category";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import type { HeatDevice } from "entities/Heatcounters";
import { ObjectSubCategoryType } from "entities/ObjectSubCategory";
import { ObjectItem, ObjectResponse } from "entities/Objects";
import { PumpDeviceData } from "entities/PumpDevice/model/types/pumpDevice";


export type CurrentHeatDevice = HeatDevice |undefined;
export type CurrentElectroDevice = TopLevelElectroDevice |undefined;
export type CurrentObject = ObjectItem | undefined;
export type CategoryInList = CategoryItem | undefined;
type SelectedItem = boolean | undefined
export interface DeviceListState{
    currentHeatDevice: CurrentHeatDevice;
    currentElectroDevice: CurrentElectroDevice;
    currentObject: CurrentObject ;
    currentCategory: CategoryInList;
    currentPumpDevice:PumpDeviceData;
    currentSubcat:number;
    objectThroughSubcat:CurrentObject;
    isElectroDevice?:SelectedItem;
    isHeatDevice?:SelectedItem;
    isPumpDevice?:SelectedItem;
}

const initialState:DeviceListState = {
    currentSubcat:undefined,
    currentHeatDevice:undefined,
    currentElectroDevice:undefined,
    currentObject:undefined,
    currentCategory:undefined,
    currentPumpDevice:undefined,
    objectThroughSubcat:undefined
};

export const deviceListSlice = createSlice({
    name:"deviceList",
    initialState,
    reducers:{
        setProxyObject(state,action:PayloadAction<CurrentObject>) {
            state.objectThroughSubcat = action.payload;
        },
        setObject(state,action:PayloadAction<CurrentObject>) {
            state.currentElectroDevice=undefined;
            state.currentHeatDevice=undefined;
            state.currentPumpDevice=undefined;
            state.currentObject=action.payload;
            if (state.currentObject && state.currentObject.id!==action.payload.id){
                state.currentSubcat=undefined;
            }
            if (!state.currentObject) {
                state.currentSubcat=undefined;
            }
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isPumpDevice=false;
        },
        setElectroDevice(state,action:PayloadAction<TopLevelElectroDevice>) {
            state.currentElectroDevice=action.payload;
            state.currentHeatDevice=undefined;
            // state.currentSubcat=undefined;
            // state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=true;
            state.currentPumpDevice=undefined;
            state.isPumpDevice=false;


        },
        setHeatDevice(state,action:PayloadAction<HeatDevice>) {
            state.currentElectroDevice=undefined;
            // state.currentSubcat=undefined;
            state.currentHeatDevice=action.payload;
            // state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.currentPumpDevice=undefined;
            state.isPumpDevice=false;

        },
        setPumpDevice(state,action:PayloadAction<PumpDeviceData>) {
            state.currentElectroDevice=undefined;
            state.currentPumpDevice=action.payload;
            state.currentHeatDevice=undefined;
            // state.currentSubcat=undefined;
            // state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isPumpDevice=true;
        },
        setCategory(state,action:PayloadAction<CategoryItem>) {
            state.currentElectroDevice=undefined;
            state.currentHeatDevice=undefined;
            state.currentSubcat=undefined;
            // state.currentObject=undefined;
            state.currentCategory = action.payload;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.currentPumpDevice=undefined;
            state.isPumpDevice=false;
        },
        setSubcat(state,action:PayloadAction<number>) {
            state.currentElectroDevice=undefined;
            state.currentHeatDevice=undefined;
            state.currentSubcat=action.payload;
            console.log("ИЗМЕНЯЕМ САБКАТ (в редюсере) ",action.payload);
            // state.currentObject=undefined;
            state.currentCategory = undefined;
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.currentPumpDevice=undefined;
            state.isPumpDevice=false;
        },
        setIsHeatDev(state) {
            state.isHeatDevice=true;
            state.isElectroDevice=false;
            state.isPumpDevice=false;
        },
        setIsPumpDev(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isPumpDevice=true;

        },
        setIsElDev(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=true;
            state.isPumpDevice=false;

        },
        setNotSelected(state) {
            state.isHeatDevice=false;
            state.isElectroDevice=false;
            state.isPumpDevice=false;

        },
    }
});
export const deviceListReducer = deviceListSlice.reducer;
export const deviceListActions = deviceListSlice.actions;