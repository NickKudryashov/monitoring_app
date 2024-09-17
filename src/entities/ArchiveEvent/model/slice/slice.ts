import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ArchiveEventsSliceSchema } from "@/entities/ArchiveEvent/types/type";
import { fetchEvents } from "../service/fetchEvents";

const initialState: ArchiveEventsSliceSchema = {
    isLoading: false,
    events:[],
};

export const archiveEventsSlice = createSlice({
    name: "archiveEvents",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        clearEvents: (state) => {
            state.events = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = [...state.events,...action.payload];
            });
        // .addCase(fetchMessages.pending, (state) => {
        //     state.isLoading = true;
        // });
    }
});

export const { actions: archiveEventsActions } = archiveEventsSlice;
export const { reducer: archiveEventsReducer } = archiveEventsSlice;