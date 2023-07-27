import { createAsyncThunk } from "@reduxjs/toolkit";
import { findChildrens } from "../lib/helpers";
import CategoryService from "../service/CategoryService";

export const categoriesAllRequest = createAsyncThunk("categories/index",async (_,thunkAPI)=>{
    const response = await CategoryService.getAllCategories();
    return response.data;
});

// export const categoryDeleteRequest = createAsyncThunk("categories/delete",async (id:number,thunkAPI)=>{

//     const response = await CategoryService.deleteCategory(id);

//     return id;
// });

export const categoryDeleteRequest = createAsyncThunk("categories/delete",async (ids:number[],thunkAPI)=>{
    let id;
    for (id of ids){
        const response = await CategoryService.deleteCategory(id);
    }
    return ids;
});