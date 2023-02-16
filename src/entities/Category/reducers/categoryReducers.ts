import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryResponse } from "../types/types";
import { categoriesAllRequest } from "./actionCreators";

export interface CategoryItem {
    name:string;
    id:number;
    parentID:number;
    expanded:boolean;
}

interface categoryState{
    categories:CategoryItem[];
}

const initialState:categoryState = {categories:[]};

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        expand(state,action:PayloadAction<number>) {
            state.categories.map(element=>{if (element.id === action.payload) {
                element.expanded=!element.expanded;
                localStorage.setItem(`category_${element.id}`,String(element.expanded || ""));
            }});
        },
        openCat(state,action:PayloadAction<number>) {
            state.categories.map(element=>{
                if (element.id === action.payload) {
                    element.expanded=true;
                    localStorage.setItem(`category_${element.id}`,String(element.expanded || ""));
                }
            });
        },
        closeCat(state,action:PayloadAction<number>) {
            state.categories.map(element=>{
                if (element.id === action.payload) {
                    element.expanded=false;
                    localStorage.setItem(`category_${element.id}`,String(element.expanded || ""));
                }
            });
        },
        closeAllCatsExceptSelected(state,action:PayloadAction<CategoryItem>) {
            state.categories.map(element=>{
                if (element.id === action.payload.id || element.id===action.payload.parentID) {
                    element.expanded=true;
                }
                else {
                    element.expanded=false;
                }
                localStorage.setItem(`category_${element.id}`,String(element.expanded || ""));
            });
        },

    },
    extraReducers:{
        [categoriesAllRequest.fulfilled.type]: (state,action:PayloadAction<CategoryResponse[]> )=>{
            const temp = action.payload.map(element=>({...element,expanded:Boolean(localStorage.getItem(`category_${element.id}`)) || false}));
            state.categories=temp;
        },
        [categoriesAllRequest.rejected.type]: (state,action:PayloadAction<CategoryResponse[]> )=>{
            alert("Произошла ошибка обновления");
        }
    }
});

export const categoryReducer = categorySlice.reducer;

const temp = "false";
console.log(Boolean(temp));