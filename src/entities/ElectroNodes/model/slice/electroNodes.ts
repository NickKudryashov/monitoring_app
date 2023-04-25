import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchElectroNodes,fetchElectroNodeById } from "../services/fetchElectroNodes/fetchElectroNodes";
import { ElectroNodeData, ElectroNodesSchema } from "../types/electroNodes";

const initialState: ElectroNodesSchema = {
    isLoading: false,
};

export const electroNodesSlice = createSlice({
    name: "electroNodes",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        selectElectroNode(state,action:PayloadAction<ElectroNodeData>) {
            state.selectedNode=action.payload;
        },
        unselectElectroNode(state) {
            state.selectedNode=undefined;
        },
        expand(state,action:PayloadAction<number>) {
            state.data.map(element=>{if (element.id === action.payload) {
                element.expanded=!element.expanded;
                localStorage.setItem(`electroNode_${element.id}`,String(element.expanded || ""));
            }});
        },
        closeNodeForObject(state,action:PayloadAction<number>) {
            state.data.map(element=>{if (element.user_object === action.payload) {
                element.expanded=false;
                localStorage.setItem(`electroNode_${element.id}`,String(element.expanded || ""));
            }});
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchElectroNodes.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchElectroNodes.fulfilled,
                (state, action: PayloadAction<ElectroNodeData[]>) => {
                    state.isLoading = false;
                    state.data = action.payload.map(element=>({...element,expanded:Boolean(localStorage.getItem(`electroNode_${element.id}`)) || false}));
                }
            )
            .addCase(fetchElectroNodes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchElectroNodeById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchElectroNodeById.fulfilled,
                (state, action: PayloadAction<ElectroNodeData>) => {
                    state.isLoading = false;
                    state.data = state.data.map(element=>{
                        if (element.id===action.payload.id) {
                            return {...action.payload,expanded:Boolean(localStorage.getItem(`electroNode_${element.id}`)) || false};
                        }
                        return element;
                    });
                }
            )
            .addCase(fetchElectroNodeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: electroNodesActions } = electroNodesSlice;
export const { reducer: electroNodesReducer } = electroNodesSlice;