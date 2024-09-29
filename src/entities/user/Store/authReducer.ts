import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../Models/User";
import { DefaultAuthCheckResponse, DefaultAuthResponse, } from "../types/types";
import { defaultAuthCheck, defaultLogin, getUserData, getVersion } from "./actionCreators";
import { buildSlice } from "@/shared/store";

export interface UserState {
    isAuth:boolean;
    licenseAccepted:boolean;
    rulesAccepted:boolean;
    personalDataAccepted:boolean;
    userdata?:UserData;
    version?:string;
}

const initialState:UserState = {
    isAuth:false,
    licenseAccepted:false,
    rulesAccepted: false,
    personalDataAccepted: false,
    version:""
};


export const userSlice = buildSlice({
    name:"user",
    initialState,
    reducers: {
        logout(state){
            state.isAuth = false;
            localStorage.setItem("access_token","");
            localStorage.setItem("refresh_token","");
            state.userdata = undefined;
        }
    },
    extraReducers:builder =>{
        builder.addCase(defaultLogin.fulfilled.type,(state,action: PayloadAction<DefaultAuthResponse>) => {
            state.isAuth = true;
            localStorage.setItem("access_token",action.payload.access);
            localStorage.setItem("refresh_token",action.payload.refresh);
        })
        .addCase(defaultLogin.rejected.type,(state,action) => {
            state.isAuth = false;
            alert("Авторизация неудачна!");
        })
        .addCase(defaultAuthCheck.fulfilled.type,(state,action: PayloadAction<DefaultAuthCheckResponse>)=>{
            state.isAuth = true;
            localStorage.setItem("access_token",action.payload.access);
        })
        .addCase(defaultAuthCheck.rejected.type, (state,action: PayloadAction<DefaultAuthCheckResponse>)=>{
            state.isAuth = false;
        })
        .addCase(getUserData.fulfilled.type, (state,action:PayloadAction<UserData>)=>{
            state.userdata=action.payload;

        })
        .addCase(getVersion.fulfilled.type, (state,action:PayloadAction<string>)=>{
            state.version=action.payload;

        })
    }
});

// export const userReducer = userSlice.reducer;
export const {reducer:userReducer,
                actions:userActions,
                useActions:useUserActions
} = userSlice;