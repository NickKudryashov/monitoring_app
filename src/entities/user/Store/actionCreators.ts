import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../Service/UserService";
import { DefaultAuthRequestData } from "../types/types";

export const defaultLogin = createAsyncThunk("user/defaultLogin",async (userData:DefaultAuthRequestData,thunkAPI)=> {
    const response = await UserService.defaultLogin(userData.email,userData.password);
    return response.data;
});

export const defaultAuthCheck = createAsyncThunk("user/defaultAuthCheck",async(_,thunkAPI)=>{
    const response = await UserService.checkDefaultLogin();
    return response.data;
});

export const getUserData = createAsyncThunk("user/userData",async(_,thunkAPI)=>{
    const response = await UserService.getUserInfo();
    return response.data;
});

export const getVersion = createAsyncThunk("user/version",async(_,thunkAPI)=>{
    const response = await UserService.getVersion();
    return response.data.version;
});