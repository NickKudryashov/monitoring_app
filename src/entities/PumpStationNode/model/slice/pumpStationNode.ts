import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPumpStationNode } from "../services/fetchPumpStationNode/fetchPumpStationNode";
import { PumpStationNodeSchema } from "../types/pumpStationNode";

const initialState: PumpStationNodeSchema = {
    isLoading: false,
    data:[]
};

export const pumpStationNodeSlice = createSlice({
    name: "pumpStationNode",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        expandNode: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.map((el)=>{
                if (el.id===payload) {
                    const temp = localStorage.getItem("pump_node_"+el.id);
                    let flag;
                    if (temp){
                        localStorage.setItem("pump_node_"+el.id,"");
                        flag = false;
                    }
                    else {
                        localStorage.setItem("pump_node_"+el.id,"true");
                        flag = true;
                    }
                    return {...el,expanded:flag};
                }
                return {...el};
            });},
        closeAllExcept: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.map((el)=>{
                if (el.id!==payload) {
                    localStorage.setItem("pump_node_"+el.id,"");
                    return {...el,expanded:false};
                }
                else {
                    localStorage.setItem("pump_node_"+el.id,"true");
                    return {...el,expanded:false};
                }
            });
        },
        closeAll: (state) => {
            state.data = state.data.map((el)=>{
                localStorage.setItem("pump_node_"+el.id,"");
                return {...el,expanded:false};
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPumpStationNode.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPumpStationNode.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload.map((el)=>{
                        const flag = localStorage.getItem("pump_node_"+el.id);
                        if (!flag) {
                            return {...el,expanded:false};
                        }
                        else {
                            return {...el,expanded:true};
                        }
                    });
                }
            )
            .addCase(fetchPumpStationNode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: pumpStationNodeActions } = pumpStationNodeSlice;
export const { reducer: pumpStationNodeReducer } = pumpStationNodeSlice;