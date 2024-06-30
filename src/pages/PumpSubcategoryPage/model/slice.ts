import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PumpPageStateSchema } from "../types/type";

const initialState:PumpPageStateSchema = {
};


export const pumpSubcatPageSlice = createSlice({
    name:"pumppage",
    initialState,
    reducers:{
        setParameterSubgroup(state,action:PayloadAction<string>) {
            state.selectedParameterSubGroup=action.payload;
        },
        clearParameterSubgroup(state) {
            state.selectedParameterSubGroup=undefined;
        },
    },
});

export const pumpPageSliceReducer = pumpSubcatPageSlice.reducer;
export const {actions:pumpPageSliceActions} = pumpSubcatPageSlice;