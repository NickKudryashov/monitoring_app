import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ObjectSubCategorySchema, ObjectSubCategoryType } from "../types/ObjectSubCategorySchema";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { deleteSubCat, editSubCat, fetchByObjId } from "../actions/fetchSubCats";
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
        update (state,action:PayloadAction<ObjectSubCategoryType>) {
            ObjSubcategoryAdapter.updateOne(state,{id:action.payload.id,changes:action.payload});
        },
        remove (state,action:PayloadAction<ObjectSubCategoryType>) {
            ObjSubcategoryAdapter.removeOne(state,action.payload.id);
        },
        selectCard (state,action:PayloadAction<number>) {
            state.selectedItemToDrop = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchByObjId.fulfilled,(state,action)=>{
                ObjSubcategoryAdapter.setMany(state,action.payload);
                // if (state.ids.length>action.payload.length) {
                //     const actual_ids = Object.values(action.payload).map((el)=>el.id);
                //     const toDelete = state.ids.map((el)=> {
                //         if (!actual_ids.includes(Number(el))) {
                //             return el;
                //         }
                //     });
                //     ObjSubcategoryAdapter.removeMany(state,toDelete);
                // }

            })
            .addCase(fetchByObjId.pending,(state,action)=>{
                // ObjSubcategoryAdapter.setMany(state,action.payload);
            })
            .addCase(editSubCat.fulfilled,(state,action)=>{
                ObjSubcategoryAdapter.setOne(state,action.payload);
            })
            .addCase(deleteSubCat.fulfilled,(state,action)=>{
                ObjSubcategoryAdapter.removeOne(state,action.payload.id);
                if (action.payload.id === state.lastExpandedId) {
                    state.lastExpandedId = undefined;
                }
            });
    }
});

export const {reducer:objSubCategoryReducer} = objSubCatSlice;
export const {actions:objSubCategoryActions} = objSubCatSlice;
export const objSubCatSelector = ObjSubcategoryAdapter.getSelectors<StateSchema>((state)=>state.objSubCat || ObjSubcategoryAdapter.getInitialState() );