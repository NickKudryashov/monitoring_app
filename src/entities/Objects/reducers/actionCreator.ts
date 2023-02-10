import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectService } from "../service/ObjectService";
import { ObjectResponse } from "../types/types";
export const objectsAllRequest = createAsyncThunk('objects/index',async (_,thunkAPI)=>{
    const response = await ObjectService.getObjects()
    return response.data
})