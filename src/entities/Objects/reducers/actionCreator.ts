import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectService } from "../service/ObjectService";
export const objectsAllRequest = createAsyncThunk("objects/index",async (_,thunkAPI)=>{
    const response = await ObjectService.getObjects();
    return response.data;
});

export const objectsDelRequest = createAsyncThunk("objects/delete",async (id:number,thunkAPI)=>{
    const response = await ObjectService.deleteObj(id);
    return id;
});