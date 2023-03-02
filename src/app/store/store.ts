import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "entities/user";
import { categoryReducer } from "entities/Category";
import { objectReducer } from "entities/Objects";
import { heatNodeReducer } from "entities/HeatNodes";
import { heatDeviceReducer } from "entities/Heatcounters";
import { deviceListReducer } from "widgets/DeviceList";

const rootReducer = combineReducers({
    userReducer,
    categoryReducer, 
    objectReducer,
    heatNodeReducer,
    heatDeviceReducer,
    deviceListReducer,
});


export const setupStore=()=>{
    return configureStore({
        reducer:rootReducer
    });
};


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]