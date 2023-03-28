import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeatNodeResponse } from "../types/types";
import { heatNodeAllRequest, heatNodeRequest } from "./actionCreators";

interface HeatNodeItem {
    name:string;
    id:number;
    user_object:number;
    expanded:boolean;
}

export interface heatNodeState{
    heatNodes:HeatNodeItem[];
    selectedNode:HeatNodeResponse | undefined;
}

const initialState:heatNodeState = {heatNodes:[],selectedNode:undefined};

export const heatNodeSlice = createSlice({
    name:"heatnodes",
    initialState,
    reducers:{
        selectHeatNode(state,action:PayloadAction<HeatNodeResponse>) {
            state.selectedNode=action.payload;
        },

        expand(state,action:PayloadAction<number>) {
            state.heatNodes.map(element=>{if (element.id === action.payload) {
                element.expanded=!element.expanded;
                localStorage.setItem(`heatNode_${element.id}`,String(element.expanded || ""));
            }});
        },
        closeNodeForObject(state,action:PayloadAction<number>) {
            state.heatNodes.map(element=>{if (element.user_object === action.payload) {
                element.expanded=false;
                localStorage.setItem(`heatNode_${element.id}`,String(element.expanded || ""));
            }});
        }
    },
    extraReducers:{
        [heatNodeAllRequest.fulfilled.type]: (state,action:PayloadAction<HeatNodeResponse[]> )=>{
            const temp = action.payload.map(element=>({...element,expanded:Boolean(localStorage.getItem(`heatNode_${element.id}`)) || false}));
            state.heatNodes=temp;
        },
        [heatNodeRequest.fulfilled.type]: (state,action:PayloadAction<HeatNodeResponse> )=>{
            state.heatNodes = state.heatNodes.map(element=> {
                if (element.id===action.payload.id){
                    return {...element,expanded:Boolean(localStorage.getItem(`heatNode_${element.id}`)) || false};
                }
                return element;
            });
        },
        [heatNodeAllRequest.rejected.type]: (state,action:PayloadAction<HeatNodeResponse[]> )=>{
            alert("Произошла ошибка обновления");
        }
    }
});

export const heatNodeReducer = heatNodeSlice.reducer;
