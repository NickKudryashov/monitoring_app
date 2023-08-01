import { createAsyncThunk } from "@reduxjs/toolkit";
import { PumpNode } from "../../types/pumpStationNode";
import $api from "shared/api";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";


export const fetchPumpStationNode = createAsyncThunk<
PumpNode[],
 void,
 ThunkConfig<string>
>("get/pumpStationNode", async (_, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await $api.get<PumpNode[]>("pump_node");
        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("ERROR");
    }
});