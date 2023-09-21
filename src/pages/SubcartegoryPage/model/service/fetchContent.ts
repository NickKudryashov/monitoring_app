import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "shared/api";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";
import { ObjectSubCategoryType } from "entities/ObjectSubCategory";
import { HeatDevice } from "entities/Heatcounters";
import { TopLevelElectroDevice } from "entities/ElectroDevice";
import { PumpDeviceData } from "entities/PumpDevice";


export const fetchChildren = createAsyncThunk<ObjectSubCategoryType[],number,ThunkConfig<string>>("subcats/childrens",async (cat_id,thunkAPI)=>{
    const response = await $api.get<ObjectSubCategoryType[]>("subcategory/"+cat_id+"/children");
    return response.data;
});

export const fetchHeat = createAsyncThunk<number[],number,ThunkConfig<string>>("subcats/heat",async (cat_id,thunkAPI)=>{
    const response = await $api.get<number[]>("subcategory/"+cat_id+"/heat");
    return response.data;
});


export const fetchElectro = createAsyncThunk<number[],number,ThunkConfig<string>>("subcats/electro",async (cat_id,thunkAPI)=>{
    const response = await $api.get<number[]>("subcategory/"+cat_id+"/electro");
    return response.data;
});


export const fetchPump = createAsyncThunk<number[],number,ThunkConfig<string>>("subcats/pump",async (cat_id,thunkAPI)=>{
    const response = await $api.get<number[]>("subcategory/"+cat_id+"/pump");
    return response.data;
});

export const fetchDetail = createAsyncThunk<ObjectSubCategoryType,number,ThunkConfig<string>>("subcats/detail",async (cat_id,thunkAPI)=>{
    const response = await $api.get<ObjectSubCategoryType>("subcategory/"+cat_id+"/detail");
    return response.data;
});