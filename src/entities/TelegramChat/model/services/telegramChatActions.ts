import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/shared/api";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/stateSchema";
import { MessagesByChat, TelegramChat, TelegramMessage } from "../types/ChatSchema";


interface MessagesResponse {
    chat_id:number;
    messages:TelegramMessage[];
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
}


export const fetchMessages = createAsyncThunk<
MessagesResponse,
FetchMessagesProps,
 ThunkConfig<string>
>("get/telegramMessages", async ({chat_id,offset=0}, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await $api.post<TelegramMessage[]>("chat/messages/"+chat_id,{start:offset});
        if (!response.data) throw new Error();

        return {chat_id,messages:response.data};
    } catch (error) {
        console.log(error);
        return rejectWithValue("ERROR");
    }
});