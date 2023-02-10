import { createAsyncThunk } from "@reduxjs/toolkit";
import HeatDeviceService from "../service/HeatDeviceService";

export const getDevices = createAsyncThunk('getHeatDevs',async (_,thunkAPI)=>{
    const response = await HeatDeviceService.getAllHeatDevices()
    return response.data
})