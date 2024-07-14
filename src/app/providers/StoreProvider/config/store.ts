import { CombinedState, combineReducers, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { categoryReducer } from "entities/Category";
import { heatDeviceReducer } from "entities/Heatcounters";
import { objectReducer } from "entities/Objects";
import { userReducer } from "entities/user";
import { deviceListReducer } from "widgets/DeviceList";
import { StateSchema } from "./stateSchema";
import { electroDeviceReducer } from "entities/ElectroDevice";
import { heatArchivesReducer } from "features/HeatArchives/model/slice/heatArchives";
import { pumpDeviceReducer } from "entities/PumpDevice";
import { chatReducer } from "entities/TelegramChat";
import { objSubCategoryReducer } from "entities/ObjectSubCategory";
import { subCatPageReducer } from "pages/SubcartegoryPage";
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
        category:categoryReducer, 
        objects:objectReducer,
        heatDevices:heatDeviceReducer,
        deviceList:deviceListReducer,
        electroDevices:electroDeviceReducer,
        archives:heatArchivesReducer,
        pumpDevices:pumpDeviceReducer,
        chats:chatReducer,
        objSubCat:objSubCategoryReducer,
        subCatPage:subCatPageReducer,
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