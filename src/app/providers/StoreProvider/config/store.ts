import { CombinedState, combineReducers, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { objectReducer } from "entities/Objects";
import { userReducer } from "entities/user";
import { StateSchema } from "./stateSchema";
import { chatReducer } from "entities/TelegramChat";
import { objSubCategoryReducer } from "entities/ObjectSubCategory";
import { rtkApi } from "shared/api/rtkApi";
import { subcatCardSliceReducer } from "features/ObjectCategoryCardView";
import { archiveEventsReducer } from "entities/ArchiveEvent";
import { navbarReducer } from "widgets/Navbar";
import { tabSliceReducer } from "widgets/SubcategoryTabs";
import { pumpPageSliceReducer } from "pages/PumpSubcategoryPage";
import { chartReducer } from "entities/Chart";
import { chartBuilderReducer } from "widgets/ChartBuilder";



export function createReduxStore(initialState?:StateSchema) {
    const rootReducer:ReducersMapObject<StateSchema>= {
        user:userReducer,
        objects:objectReducer,
        chats:chatReducer,
        objSubCat:objSubCategoryReducer,
        subcatCards:subcatCardSliceReducer,
        archiveEvents:archiveEventsReducer,
        navbar:navbarReducer,
        tabs:tabSliceReducer,
        pumpPage:pumpPageSliceReducer,
        chart:chartReducer,
        chartBuilder:chartBuilderReducer,
        [rtkApi.reducerPath]:rtkApi.reducer

    };
    return configureStore({
        reducer:rootReducer,
        devTools:__IS_DEV__,
        preloadedState:initialState,
        middleware:(getDefaultMiddleware)=>
            getDefaultMiddleware().concat(rtkApi.middleware),
    });
}


export type RootState = ReturnType<typeof createReduxStore>
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]