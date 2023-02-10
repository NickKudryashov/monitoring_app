import { createAsyncThunk } from "@reduxjs/toolkit";
import { HeatNodeService } from "../service/heatNode";


export const heatNodeAllRequest = createAsyncThunk('heatNodes/index',async (_,thunkAPI)=>{
    const response = await HeatNodeService.getHeatNodes()
    return response.data
})