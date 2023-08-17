import { createSlice } from "@reduxjs/toolkit";
import { SubCategoryPageSchema } from "../types/SubcategorySchema";
import { fetchChildren, fetchDetail, fetchElectro, fetchHeat, fetchPump } from "../service/fetchContent";



const initialState:SubCategoryPageSchema = {
    electrocounter:[],
    heatcounters:[],
    isLoading:false,
    pumps:[],
    subcats:[],
    current:undefined
};


const subCatPageSlice = createSlice({
    initialState,
    name:"subcatPageSlice",
    reducers:{
        removeCurrent (state) {
            state.current=undefined;
        },
        removeHeat (state) {
            state.heatcounters=[];
        },
        removeElectro (state) {
            state.electrocounter=[];
        },
        removePumps (state) {
            state.pumps=[];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchChildren.fulfilled,(state,action)=>{
                state.subcats=action.payload;
            }).
            addCase(fetchHeat.fulfilled,(state,action)=>{
                state.heatcounters = action.payload;
            }).
            addCase(fetchElectro.fulfilled,(state,action)=>{
                state.electrocounter = action.payload;
            }).
            addCase(fetchPump.fulfilled,(state,action)=>{
                state.pumps = action.payload;
            }).
            addCase(fetchDetail.fulfilled,(state,action)=>{
                state.current = action.payload;
            });
    },
});


export const {reducer:subCatPageReducer} = subCatPageSlice;
export const {actions:subCatPageActions} = subCatPageSlice;