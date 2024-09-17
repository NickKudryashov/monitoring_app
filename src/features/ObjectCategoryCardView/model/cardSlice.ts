import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubcategoryAnswer } from "@/entities/ObjectSubCategory";

export interface SubcatCardsSchema {
    selectedItem:SubcategoryAnswer | undefined;
}

const initialState: SubcatCardsSchema = {
    selectedItem:undefined
};

export const subcatCardSlice = createSlice({
    name: "subcatCards",
    initialState,
    reducers: {
        setItem:(state,{payload}:PayloadAction<SubcategoryAnswer> ) => {
            state.selectedItem = payload;
        },
        removeItem:(state) => {
            state.selectedItem = undefined;
        }
    }
});

export const { actions: subcatCardSliceActions } = subcatCardSlice;
export const { reducer: subcatCardSliceReducer } = subcatCardSlice;