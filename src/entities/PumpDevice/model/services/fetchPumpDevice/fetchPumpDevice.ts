import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";
import $api from "shared/api";
import { PumpDeviceData, PumpPollResponse } from "../../types/pumpDevice";
import { converDatetime } from "../../slice/pumpDevice";


export const fetchPumpDevice = createAsyncThunk<PumpDeviceData[],void,ThunkConfig<string>>("main/pumpDevice",
    async (_, thunkApi) => {

        try {
            const response = await $api.get<PumpDeviceData[]>("pump");
            if (!response.data) throw new Error();
            for (const t of response.data) {
                t.last_update = converDatetime(t.last_update);
            }

            return response.data;
        } catch (error) {
            console.log(error);
        }
    });

export const pollPumpDevice = createAsyncThunk<{task_id:string},number,ThunkConfig<string>>("poll/pumpDevice",
    async (id, thunkApi) => {

        try {
            const responseTask = await $api.post<{task_id:string}>("pump/poll/"+id);
            return responseTask.data;
        } catch (error) {
            console.log(error);
        }
    });

export const checkPollPumpDevice = createAsyncThunk<PumpPollResponse,number,ThunkConfig<string>>("checkPoll/pumpDevice",
    async (id, thunkApi) => {
        const {dispatch,getState} = thunkApi;
        const {pumpDevices} = getState();
        try {
            const responseTask = await $api.put<PumpPollResponse>("pump/poll/"+id,{task_id:pumpDevices.task_id});
            return responseTask.data;
        } catch (error) {
            console.log(error);
        }
    });

