import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "shared/api";
import { ObjectSubCategoryType } from "../types/ObjectSubCategorySchema";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";


export const fetchByObjId = createAsyncThunk<ObjectSubCategoryType[],number,ThunkConfig<string>>("subcats/index",async (obj_id,thunkAPI)=>{
    const response = await $api.post<ObjectSubCategoryType[]>("subcategory/"+obj_id);
    return response.data;
});

interface EditPayload {
    parent?:number | null;
    user_object?:number;
    name?:string;
}

interface EditProps {
    cat_id:number;
    data:EditPayload
}
export const editSubCat = createAsyncThunk<ObjectSubCategoryType,EditProps,ThunkConfig<string>>("subcats/edit",async (props,thunkAPI)=>{
    const {cat_id,data} = props;
    const response = await $api.post<ObjectSubCategoryType>("subcategory/"+cat_id+"/edit",data);
    return response.data;
});


export const deleteSubCat = createAsyncThunk<ObjectSubCategoryType,number,ThunkConfig<string>>("subcats/delete",async (cat_id,thunkAPI)=>{
    const response = await $api.post<ObjectSubCategoryType>("subcategory/"+cat_id+"/delete");
    return response.data;
});