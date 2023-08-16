import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ObjectSubCategorySchema, ObjectSubCategoryType } from "../types/ObjectSubCategorySchema";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { deleteSubCat, editSubCat, fetchByObjId } from "../actions/fetchSubCats";

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
        ids:[]}),
    reducers:{
        changeExpand (state,action:PayloadAction<number | undefined>) {
            if (!action.payload) {
                localStorage.removeItem("subcategory_"+state.lastExpandedId);
                state.lastExpandedId = undefined;
            }
            else if (state.lastExpandedId === action.payload) {
                state.lastExpandedId = undefined;
                localStorage.removeItem("subcategory_"+action.payload);
            }
            else {
                console.log("expand reducer");
                if (state.lastExpandedId && state.entities[state.lastExpandedId].id!==state.entities[action.payload].parent) {
                    localStorage.removeItem("subcategory_"+state.lastExpandedId);
                }
                localStorage.setItem("subcategory_"+action.payload,"1");
                
                state.lastExpandedId = action.payload;
            }
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