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
        subCatPage:subCatPageReducer

    };
    return configureStore<StateSchema>({
        reducer:rootReducer,
        devTools:__IS_DEV__,
        preloadedState:initialState,
    });
}


export type RootState = ReturnType<typeof createReduxStore>
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]