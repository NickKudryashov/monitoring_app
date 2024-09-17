import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/stateSchema";
import { ArchiveEvent } from "@/entities/ArchiveEvent/types/type";
import $api from "@/shared/api";

interface FetchEventsProps {
    offset:number;
}

export const fetchEvents = createAsyncThunk<
ArchiveEvent[],
FetchEventsProps,
 ThunkConfig<string>
>("get/archiveEvents", async ({offset}, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await $api.get<ArchiveEvent[]>("archives_events/"+offset);
        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("ERROR");
    }
});