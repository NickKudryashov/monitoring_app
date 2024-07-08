import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartStateSchema, ParameterDataSet } from "entities/Chart/types/type";

const initialState:ChartStateSchema = {datasets:[]};

export const chartSlice = createSlice({
    name:"chart",
    initialState,
    reducers:{
        addDataset(state,action:PayloadAction<ParameterDataSet>) {
            state.datasets = [...state.datasets,action.payload];
        },
        removeDataset(state,action:PayloadAction<Omit<ParameterDataSet,"data">>) {
            state.datasets = state.datasets.filter((el)=>!(el.id===action.payload.id && el.name===action.payload.name));
        },
        clearDatasets(state) {
            state.datasets = [];
        },
    },
});


export const {reducer:chartReducer } = chartSlice;
export const {actions:chartActions } = chartSlice;