import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkPollPumpDevice, fetchPumpDevice, pollPumpDevice } from "../services/fetchPumpDevice/fetchPumpDevice";
import { PumpDeviceSchema } from "../types/pumpDevice";

export const converDatetime = (dt:string):string => {
    if (!dt) {
        return null;
    }
    const mainList = dt.split("T");
    const date = mainList[0].split("-");
    const resultDate = date[2]+"."+date[1]+"."+date[0] + " ";
    const resultTime = mainList[1].split(".")[0];
    return resultDate+resultTime;
};

const initialState: PumpDeviceSchema = {
    isLoading: false,
    error: "",
    data:[],
    task_id:undefined
};

export const pumpDeviceSlice = createSlice({
    name: "pumpDevice",
    initialState,
    reducers: {
        setIsLoading:(state,{payload}:PayloadAction<boolean> ) => {
            state.isLoading = payload;
        },
        expandDev: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.map((el)=>{
                if (el.id===payload) {
                    const temp = localStorage.getItem("pump_dev_"+el.id);
                    let flag;
                    if (temp=="true"){
                        localStorage.setItem("pump_dev_"+el.id,"");
                        flag = false;
                    }
                    else {
                        localStorage.setItem("pump_dev_"+el.id,"true");
                        flag = true;
                    }
                    return {...el,expanded:flag};
                }
            });
        },
        closeAllExcept: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.map((el)=>{
                if (el.id!==payload) {
                    localStorage.setItem("pump_dev_"+el.id,"");
                    return {...el,expanded:false};
                }
                else {
                    localStorage.setItem("pump_dev_"+el.id,"true");
                    return {...el,expanded:false};
                }
            });
        },
        closeAll: (state) => {
            state.data = state.data.map((el)=>{
                localStorage.setItem("pump_dev_"+el.id,"");
                return {...el,expanded:false};
            });
        }},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchPumpDevice.fulfilled,
                (state, action) => {
                    state.data = action.payload;
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(fetchPumpDevice.rejected, (state, action) => {
                state.isLoading = false;
                state.task_id = action.payload;
            })
            .addCase(pollPumpDevice.fulfilled, (state,action) => {
                state.isLoading = true;
                state.task_id = action.payload.task_id;
            })
            .addCase(checkPollPumpDevice.fulfilled, (state,action) => {
                if (action.payload !== null) {
                    state.isLoading = false;
                    state.task_id = "";
                }
            });
    }
});

export const { actions: pumpDeviceActions } = pumpDeviceSlice;
export const { reducer: pumpDeviceReducer } = pumpDeviceSlice;