import { CombinedState, combineReducers, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { categoryReducer } from "entities/Category";
import { heatDeviceReducer } from "entities/Heatcounters";
import { heatNodeReducer } from "entities/HeatNodes";
import { objectReducer } from "entities/Objects";
import { userReducer } from "entities/user";
import { deviceListReducer } from "widgets/DeviceList";
import { StateSchema } from "./stateSchema";



export function createReduxStore(initialState?:StateSchema) {
    const rootReducer:ReducersMapObject<StateSchema>= {
        user:userReducer,
        category:categoryReducer, 
        objects:objectReducer,
        heatNodes:heatNodeReducer,
        heatDevices:heatDeviceReducer,
        deviceList:deviceListReducer,
    };
    return configureStore<StateSchema>({
        reducer:rootReducer,
        devTools:__IS_DEV__,
        preloadedState:initialState
    });
}