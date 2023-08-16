import { createAsyncThunk } from "@reduxjs/toolkit";
import HeatDeviceService from "../service/HeatDeviceService";
import { HeatDevice } from "../types/type";

export const getDevices = createAsyncThunk<HeatDevice[],void>("getHeatDevs",async (_,thunkAPI)=>{
    const response = await HeatDeviceService.getAllHeatDevices();
    return response.data;
});

export const refreshDevices = createAsyncThunk("refreshHeatDevs",async (_,thunkAPI)=>{
    const response = await HeatDeviceService.getAllHeatDevices();
    return response.data;
});

export const getDevice = createAsyncThunk<HeatDevice,number>("getHeatDev",async (id:number,thunkAPI)=>{
    const response = await HeatDeviceService.getHeatDevice(id);
    return response.data;
});

export const deleteDevice = createAsyncThunk("delHeatDev",async (id:number,thunkAPI)=>{
    const response = await HeatDeviceService.deleteHeatDevice(id);
    return  id;
});