import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchCategoryPage } from "../services/fetchCategoryPage/fetchCategoryPage";
import { CategoryPageSchema } from "../types/categoryPage";

const initialState: CategoryPageSchema = {
    isLoading: false,
};

export const categoryPageSlice = createSlice({
    name: "categoryPage",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchCategoryPage.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(
    //             fetchCategoryPage.fulfilled,
    //             (state, action: PayloadAction<any>) => {
    //                 state.isLoading = false;
    //                 state.data = action.payload;
    //             }
    //         )
    //         .addCase(fetchCategoryPage.rejected, (state, action) => {
    //             state.isLoading = false;
    //             // state.error = action.payload;
    //         });
    // }
});

export const { actions: categoryPageActions } = categoryPageSlice;
export const { reducer: categoryPageReducer } = categoryPageSlice;