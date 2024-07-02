import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PumpPageStateSchema } from "../types/type";
import { PumpDetailInfoBySystem } from "entities/PumpDevice";

const initialState:PumpPageStateSchema = {
};


export const pumpSubcatPageSlice = createSlice({
    name:"pumppage",
    initialState,
    reducers:{
        setParameterSubgroup(state,action:PayloadAction<keyof PumpDetailInfoBySystem>) {
            state.selectedParameterSubGroup=action.payload;
        },
        clearParameterSubgroup(state) {
            state.selectedParameterSubGroup=undefined;
        },
    },
});

export const pumpPageSliceReducer = pumpSubcatPageSlice.reducer;
export const {actions:pumpPageSliceActions} = pumpSubcatPageSlice;