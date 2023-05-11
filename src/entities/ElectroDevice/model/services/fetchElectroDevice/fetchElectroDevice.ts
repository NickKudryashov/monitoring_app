import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";
import { ElectroCounter, ElectroData, TopLevelElectroDevice } from "../../types/electroDevice";
import api from "shared/api";
import { createCanDict, createDeviceDict } from "entities/ElectroDevice/helpers/countersMapper";



export const fetchElectroDevices = createAsyncThunk<ElectroData,void,ThunkConfig<string>>("electroDevice/electroDevices",
    async (_, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi;

        try {
            const response_top_level_counters = await api.get<TopLevelElectroDevice[]>("electro_top_level", {});
            const response_counters = await api.get<ElectroCounter[]>("electrocounter", {});
            response_counters.data.forEach((counter)=>counter.parameters = counter.parameters.sort((par1,par2)=>par1.id-par2.id));
            const devDict = createDeviceDict(response_counters.data);
            const canDict = createCanDict(response_counters.data);
            const result:ElectroData = {topLevelDevices:response_top_level_counters.data,countersById:devDict,devicesByCan:canDict};
            if (!response_top_level_counters.data) 
                throw new Error();

            return result;
        } catch (error) {
            console.log(error);
            // return rejectWithValue("Ошибка обновления");
        }
    });