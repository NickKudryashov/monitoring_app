import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectResponse } from "../types/types";
import { objectsAllRequest } from "./actionCreator";
interface ObjectItem {
    name:string;
    id:number;
    category:number;
    expanded:boolean;
}

interface objectState {
    objects:ObjectItem[]
}

const initialState:objectState = {objects:[]};

export const objectSlice = createSlice({
    name:"objects",
    initialState,
    reducers:{
        expand(state,action:PayloadAction<number>) {
            state.objects.map(element=>{if (element.id === action.payload) {
                element.expanded=!element.expanded;
                localStorage.setItem(`object_${element.id}`,String(element.expanded || ""));
            }});
        },
        openObj(state,action:PayloadAction<number>) {
            state.objects.map(element=>{if (element.id === action.payload) {
                element.expanded=true;
                localStorage.setItem(`object_${element.id}`,String(element.expanded || ""));
            }});
        }
    },
    extraReducers:{
        [objectsAllRequest.fulfilled.type]: (state,action:PayloadAction<ObjectResponse[]>)=>{
            state.objects=action.payload.map(element=>({...element,expanded:Boolean(localStorage.getItem(`object_${element.id}`)) || false}));
        },
        [objectsAllRequest.rejected.type]: (state,action:PayloadAction<ObjectResponse[]>)=>{
            alert("ошибка обновления");
        }
    }
});


export const objectReducer = objectSlice.reducer;