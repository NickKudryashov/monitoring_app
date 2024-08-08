import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ObjectSubCategorySchema, ObjectSubCategoryType } from "../types/ObjectSubCategorySchema";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { SubcategoryAnswer } from "entities/ObjectSubCategory/api/api";

export const ObjSubcategoryAdapter = createEntityAdapter<ObjectSubCategoryType>({
    selectId:(instance)=>instance.id
}
);

export const objSubCatSlice = createSlice({
    name:"objsubcat",
    initialState:ObjSubcategoryAdapter.getInitialState<ObjectSubCategorySchema>({
        isLoading:false,
        entities:{},
        lastExpandedId:undefined,
        selectedItemToDrop:undefined,
        selectedSubcategory:null,
        ids:[]}),
    reducers:{
        selectSubcategory (state,action:PayloadAction<SubcategoryAnswer>) {
            state.selectedSubcategory = action.payload;
        },
        clearSelection (state) {
            state.selectedSubcategory = null;
        },
        selectCard (state,action:PayloadAction<number>) {
            state.selectedItemToDrop = action.payload;
        }
    },
});

export const {reducer:objSubCategoryReducer} = objSubCatSlice;
export const {actions:objSubCategoryActions} = objSubCatSlice;
export const objSubCatSelector = ObjSubcategoryAdapter.getSelectors<StateSchema>((state)=>state.objSubCat || ObjSubcategoryAdapter.getInitialState() );