import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeatNodeResponse } from "../types/types";
import { heatNodeAllRequest } from "./actionCreators";

interface HeatNodeItem {
    name:string;
    id:number;
    user_object:number;
    expanded:boolean;
}

interface heatNodeState{
    heatNodes:HeatNodeItem[];
}

const initialState:heatNodeState = {heatNodes:[]};

export const heatNodeSlice = createSlice({
    name:"heatnodes",
    initialState,
    reducers:{
        expand(state,action:PayloadAction<number>) {
            state.heatNodes.map(element=>{if (element.id === action.payload) {
                element.expanded=!element.expanded;
                localStorage.setItem(`heatNode_${element.id}`,String(element.expanded || ""));
            }});
        }
    },
    extraReducers:{
        [heatNodeAllRequest.fulfilled.type]: (state,action:PayloadAction<HeatNodeResponse[]> )=>{
            const temp = action.payload.map(element=>({...element,expanded:Boolean(localStorage.getItem(`heatNode_${element.id}`)) || false}));
            state.heatNodes=temp;
        },
        [heatNodeAllRequest.rejected.type]: (state,action:PayloadAction<HeatNodeResponse[]> )=>{
            alert("Произошла ошибка обновления");
        }
    }
});

export const heatNodeReducer = heatNodeSlice.reducer;
