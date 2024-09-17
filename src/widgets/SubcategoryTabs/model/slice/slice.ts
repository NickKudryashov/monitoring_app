import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SubcategoryTabStateSchema, SubcategoryTabsList, TabContentLength } from "@/widgets/SubcategoryTabs/types/type";

const initialState:SubcategoryTabStateSchema = {
    currentSubTab:0,
    currentTab:0,
};


export const tabsSlice = createSlice({
    name:"tabs",
    initialState,
    reducers:{
        setTab(state,action:PayloadAction<SubcategoryTabsList>) {
            if (state.tabContentLength && state.tabContentLength[action.payload]) {
                state.currentTab=action.payload;
                state.currentSubTab=0;    
            }

        },
        setSubTab(state,action:PayloadAction<number>) {
            state.currentSubTab=action.payload;
        },
        setDefaultTab(state) {
            state.currentTab=0 as SubcategoryTabsList;
            state.currentSubTab=0;
        },
        setContentLength(state,action:PayloadAction<TabContentLength>) {
            state.tabContentLength=action.payload;
            state.nonEmptyTabs=[];
            for (const key in state.tabContentLength) {
                if (state.tabContentLength[Number(key) as SubcategoryTabsList ]) {
                    state.nonEmptyTabs.push(Number(key) as SubcategoryTabsList);
                }
            }
        },
        moveDown(state) {
            if (state.tabContentLength && state.nonEmptyTabs && (state.tabContentLength[state.currentTab] - 1 === state.currentSubTab) ) {
                const index = state.nonEmptyTabs.findIndex((val)=>val===state.currentTab);
                index + 1 === state.nonEmptyTabs.length ? state.currentTab=state.nonEmptyTabs[0] : state.currentTab=state.nonEmptyTabs[index+1];
                state.currentSubTab=0;
            }
            else {
                state.currentSubTab = state.currentSubTab ? state.currentSubTab+1 : 0 ;
            }
        },
        moveUp(state) {
            if (state.currentSubTab===0 && state.nonEmptyTabs && state.tabContentLength ) {
                const index = state.nonEmptyTabs.findIndex((val)=>val===state.currentTab);
                index === 0 ? state.currentTab=state.nonEmptyTabs[-1] : state.currentTab=state.nonEmptyTabs[index-1];
                state.currentSubTab=state.tabContentLength[state.currentTab as SubcategoryTabsList]-1;
            }
            else {
                state.currentSubTab = state.currentSubTab ? state.currentSubTab-1 : 0 ;
            }
        }
    },
});

export const tabSliceReducer = tabsSlice.reducer;
export const {actions:tabSliceActions} = tabsSlice;