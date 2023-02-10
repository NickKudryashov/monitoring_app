import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../service/CategoryService";

export const categoriesAllRequest = createAsyncThunk('categories/index',async (_,thunkAPI)=>{
    const response = await CategoryService.getAllCategories()
    return response.data
})