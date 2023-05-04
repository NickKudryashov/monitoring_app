import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchElectroDevices } from "../services/fetchElectroDevice/fetchElectroDevice";
import { CANMapper, ElectroDeviceSchema, TopLevelElectroDevice } from "../types/electroDevice";
import { editElectroCounter } from "../services/editCounter/editCounter";

const initialState: ElectroDeviceSchema = {
    isLoading: false,
};

export const electroDeviceSlice = createSlice({
    name: "electroDevice",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        unselectdevice:(state)=>{
            state.selectedDevice = undefined;
        },
        selectdevice:(state,action:PayloadAction<TopLevelElectroDevice>)=>{
            state.selectedDevice = action.payload;
        },
        updateOne:(state,action:PayloadAction<TopLevelElectroDevice>)=>{
            state.data.topLevelDevices = state.data.topLevelDevices.map((element)=>element.id===action.payload.id ? {...action.payload} : {...element});
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchElectroDevices.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchElectroDevices.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    if (state.selectedDevice!==undefined){
                        state.selectedDevice = action.payload.topLevelDevices.filter((dev)=>dev.id===state.selectedDevice.id)[0];
                    }
                }
            )
            .addCase(fetchElectroDevices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editElectroCounter.fulfilled,(state,action)=>{
                const topLevelId = action.payload.device;
                const interfaceDev = action.payload.interface;
                const counterId = action.payload.id;
                state.data.devicesByCan[topLevelId][interfaceDev as CANMapper] = state.data.devicesByCan[topLevelId][interfaceDev as CANMapper].map((el)=>{ if (el.id===counterId) return {...el,...action.payload}; else {return el;} });
                state.data.countersById[topLevelId] = state.data.countersById[topLevelId].map((el)=>{ if (el.id===counterId) return {...el,...action.payload}; else {return el;} });
            });
    }
});

export const { actions: electroDeviceActions } = electroDeviceSlice;
export const { reducer: electroDeviceReducer } = electroDeviceSlice;