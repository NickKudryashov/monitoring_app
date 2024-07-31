import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";
import { ElectroCounter } from "../../types/electroDevice";
import api from "shared/api";

interface editingCounterProps {
    devId:number;
    name:string;
}

export const editElectroCounter = createAsyncThunk<ElectroCounter,editingCounterProps,ThunkConfig<string>>("electroDevice/editCounter",
    async (props, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi;
        const {devId,name} = props;
        try {
            const response = await api.put<ElectroCounter>("electrocounter/"+devId, {name});
            if (!response.data) 
                throw new Error();

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Ошибка обновления");
        }
    });