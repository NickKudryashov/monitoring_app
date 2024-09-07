import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectResponse } from "../types/types";
import { objectsAllRequest, objectsDelRequest } from "./actionCreator";
import { buildSlice } from "shared/store";
export interface ObjectItem {
    name:string;
    address:string;
    abonent:string;
    id:number;
    category:number;
    // pids_with_ids?:PidsIds;
    // cats:number[];
    // expanded:boolean;
    last_update:string;
}

export interface objectState {
    objects:ObjectItem[]
    selectedObject:ObjectItem | null
}

const initialState:objectState = {objects:[],selectedObject:null};

export const objectSlice = buildSlice({
    name:"objects",
    initialState,
    reducers:{
        selectObject(state,action:PayloadAction<number>) {
            const object = state.objects.filter((el)=>el.id===action.payload);
            if (object) {
                state.selectedObject = object[0];
            }
        },
        clearSelectObject(state){
            state.selectedObject = null;
        }
    },
    extraReducers:builder=> {
        builder.addCase(objectsAllRequest.fulfilled,(state,action:PayloadAction<ObjectResponse[]>)=>{
            state.objects=action.payload.map(element=>({...element,expanded:Boolean(localStorage.getItem(`object_${element.id}`)) || false})).sort((a,b)=>a.id-b.id);
        })
        .addCase(objectsAllRequest.rejected.type,(state,action:PayloadAction<ObjectResponse[]>)=>{
            alert("ошибка обновления");
        })
        .addCase(objectsDelRequest.fulfilled,(state,action:PayloadAction<number>)=>{
            state.objects = state.objects.filter(obj=>obj.id!==action.payload);
        })
    }
});


export const {  reducer:objectReducer,
                actions:userObjectActions,
                useActions:useUserObjectActions
                } = objectSlice;