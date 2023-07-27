import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HeatArchiveAnswer, HeatArchivesSchema } from "../types/heatArchives";
import { fetchArchData } from "../services/fetchHeatArchives/fetchHeatArchives";

const initialState: HeatArchivesSchema = {
    isLoading: false,
    data:[]
};

export const heatArchives = createSlice({
    name: "archiveBlock",
    initialState,
    reducers: {
        clearState(state) {
            state.data=[];
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchArchData.fulfilled,(state, action)=>{
                const marker = state.data?.filter(el=>el.id===action.payload.id);
                if (marker.length) {
                    console.log("успешно",marker);
                    state.data = state.data.map((el)=>{
                        if (el.id===action.payload.id){
                            return {...action.payload};
                        }
                        return el;
                    });
                    state.data = state.data.sort((a,b)=>a.id-b.id);
                }
                else {
                    console.log("стейт пустой");
                    state.data.push({...action.payload});
                    state.data = state.data.sort((a,b)=>a.id-b.id);
                }
                
            });
    }
});
export const { actions: heatArchivesActions } = heatArchives;
export const { reducer: heatArchivesReducer } = heatArchives;