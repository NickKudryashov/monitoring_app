import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultAuthResponse } from "../types/types";
import { defaultLogin } from "./actionCreators";

interface UserState {
    isAuth:boolean;
    licenseAccepted:boolean;
    rulesAccepted:boolean;
    personalDataAccepted:boolean;
}

const initialState = {
    isAuth:false,
    licenseAccepted:false,
    rulesAccepted: false,
    personalDataAccepted: false
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logout(state,action:PayloadAction){
            state.isAuth = false
        }
    },
    extraReducers:{
        [defaultLogin.fulfilled.type]: (state,action: PayloadAction<DefaultAuthResponse>) => {
            state.isAuth = true;
            localStorage.setItem('access_token',action.payload.access)
            localStorage.setItem('refresh_token',action.payload.refresh)
        },
        [defaultLogin.rejected.type] : (state,action) => {
            state.isAuth = false;
            alert('Авторизация неудачна!')
        }
    }
})

export const userReducer = userSlice.reducer