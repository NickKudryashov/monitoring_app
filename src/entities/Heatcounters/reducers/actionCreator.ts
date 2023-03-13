import { createAsyncThunk } from "@reduxjs/toolkit";
import HeatDeviceService from "../service/HeatDeviceService";

export const getDevices = createAsyncThunk("getHeatDevs",async (_,thunkAPI)=>{
    const response = await HeatDeviceService.getAllHeatDevices();
    return response.data;
});

export const getDevice = createAsyncThunk("getHeatDev",async (id:number,thunkAPI)=>{
    const response = await HeatDeviceService.getHeatDevice(id);
    return response.data;
});

export const deleteDevice = createAsyncThunk("getHeatDev",async (id:number,thunkAPI)=>{
    const response = await HeatDeviceService.deleteHeatDevice(id);
    return  id;
});