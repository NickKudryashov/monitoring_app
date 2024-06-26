import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../Models/User";
import { DefaultAuthCheckResponse, DefaultAuthResponse, } from "../types/types";
import { defaultAuthCheck, defaultLogin, getUserData, getVersion } from "./actionCreators";

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


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        logout(state,action:PayloadAction){
            state.isAuth = false;
            localStorage.setItem("access_token","");
            localStorage.setItem("refresh_token","");
            state.userdata = undefined;
        }
    },
    extraReducers:{
        [defaultLogin.fulfilled.type]: (state,action: PayloadAction<DefaultAuthResponse>) => {
            state.isAuth = true;
            localStorage.setItem("access_token",action.payload.access);
            localStorage.setItem("refresh_token",action.payload.refresh);
        },
        [defaultLogin.rejected.type] : (state,action) => {
            state.isAuth = false;
            alert("Авторизация неудачна!");
        },
        [defaultAuthCheck.fulfilled.type]: (state,action: PayloadAction<DefaultAuthCheckResponse>)=>{
            state.isAuth = true;
            localStorage.setItem("access_token",action.payload.access);
        },
        [defaultAuthCheck.rejected.type]: (state,action: PayloadAction<DefaultAuthCheckResponse>)=>{
            state.isAuth = false;
        },
        [getUserData.fulfilled.type]: (state,action:PayloadAction<UserData>)=>{
            state.userdata=action.payload;

        },
        [getVersion.fulfilled.type]: (state,action:PayloadAction<string>)=>{
            state.version=action.payload;

        }
    }
});

// export const userReducer = userSlice.reducer;
export const {reducer:userReducer} = userSlice;
export const {actions:userActions} = userSlice;