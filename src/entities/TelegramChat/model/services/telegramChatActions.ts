import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/shared/api";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/stateSchema";
import { MessagesByChat, TelegramChat, TelegramMessage } from "../types/ChatSchema";


interface MessagesResponse {
    messages:TelegramMessage[];
    stop:boolean
}

export const fetchChats = createAsyncThunk<
TelegramChat[],
 void,
 ThunkConfig<string>
>("get/telegramChats", async (_, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await $api.get<TelegramChat[]>("chat");
        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("ERROR");
    }
});

interface FetchMessagesProps {
    chat_id:number;
    offset:number;
    start_datetime?:string;
}


export const fetchMessages = createAsyncThunk<
MessagesResponse,
FetchMessagesProps,
 ThunkConfig<string>
>("get/telegramMessages", async ({chat_id,offset=0,start_datetime=''}, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await $api.post<MessagesResponse>("chat/messages/"+chat_id,{offset:offset,start_datetime:start_datetime});
        // if (!response.data) throw new Error();

        return {stop:response.data.stop,messages:response.data.messages};
    } catch (error) {
        console.log(error);
        return rejectWithValue("ERROR");
    }
});