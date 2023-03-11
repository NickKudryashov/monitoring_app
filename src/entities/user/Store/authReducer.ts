import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../Models/User";
import { DefaultAuthCheckResponse, DefaultAuthResponse, } from "../types/types";
import { defaultAuthCheck, defaultLogin, getUserData } from "./actionCreators";

interface UserState {
    isAuth:boolean;
    licenseAccepted:boolean;
    rulesAccepted:boolean;
    personalDataAccepted:boolean;
    userdata?:UserData;
}

const initialState:UserState = {
    isAuth:false,
    licenseAccepted:false,
    rulesAccepted: false,
    personalDataAccepted: false
};


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        logout(state,action:PayloadAction){
            state.isAuth = false;
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

        }
    }
});

export const userReducer = userSlice.reducer;