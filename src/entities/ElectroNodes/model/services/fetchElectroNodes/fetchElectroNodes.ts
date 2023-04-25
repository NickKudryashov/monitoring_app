import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "shared/api";
import { ElectroNodeData } from "../../types/electroNodes";
import { ThunkConfig } from "app/providers/StoreProvider/config/stateSchema";


export const fetchElectroNodes = createAsyncThunk<ElectroNodeData[],void,ThunkConfig<string>>("entities/electroNodes", async (_, thunkApi) => {
    const {rejectWithValue } = thunkApi;

    try {
        const response = await api.get<ElectroNodeData[]>("electro_node", {});
        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Ошибка загрузки данных");
    }
});

export const fetchElectroNodeById = createAsyncThunk<ElectroNodeData, number,ThunkConfig<string>>("entities/electroNodesById", async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
        const response = await api.get<ElectroNodeData>(`electro_node/${id}`, {});
        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Ошибка загрузки данных");
    }
});