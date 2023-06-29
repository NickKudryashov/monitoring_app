import { CombinedState, combineReducers, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { categoryReducer } from "entities/Category";
import { heatDeviceReducer } from "entities/Heatcounters";
import { heatNodeReducer } from "entities/HeatNodes";
import { objectReducer } from "entities/Objects";
import { userReducer } from "entities/user";
import { deviceListReducer } from "widgets/DeviceList";
import { StateSchema } from "./stateSchema";
import { electroNodesReducer } from "entities/ElectroNodes/model/slice/electroNodes";
import { electroDeviceReducer } from "entities/ElectroDevice";
import { heatArchivesReducer } from "features/HeatArchives/model/slice/heatArchives";



export function createReduxStore(initialState?:StateSchema) {
    const rootReducer:ReducersMapObject<StateSchema>= {
        user:userReducer,
        category:categoryReducer, 
        objects:objectReducer,
        heatNodes:heatNodeReducer,
        heatDevices:heatDeviceReducer,
        electroNodes:electroNodesReducer,
        deviceList:deviceListReducer,
        electroDevices:electroDeviceReducer,
        archives:heatArchivesReducer

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