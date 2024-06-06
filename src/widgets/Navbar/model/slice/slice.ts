import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NavbarStateSchema } from "../types/type";

const initialState:NavbarStateSchema = {searchValue:""};

export const navbarSlice = createSlice({
    name:"navbar",
    initialState,
    reducers:{
        setValue(state,action:PayloadAction<string>) {
            state.searchValue = action.payload.toLowerCase();
        },
        clearValue(state) {
            state.searchValue = "";
        },
    },
});

export const navbarReducer = navbarSlice.reducer;
export const navbarActions = navbarSlice.actions;