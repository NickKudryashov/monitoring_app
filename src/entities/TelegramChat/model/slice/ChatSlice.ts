import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TelegramChatSchema, TelegramMessage } from "../types/ChatSchema";
import { fetchChats, fetchMessages } from "../services/telegramChatActions";

const initialState: TelegramChatSchema = {
    isLoading: false,
    chats:[],
    messagesByChat:{}
};

export const telegramChatSlice = createSlice({
    name: "telegramChat",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchChats.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.chats = action.payload;
                })
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                const {chat_id,messages} = action.payload;
                console.log(messages);
                if (state.messagesByChat[chat_id]?.length){
                    state.messagesByChat[chat_id]=state.messagesByChat[chat_id].concat(messages);
                }
                else {
                    state.messagesByChat[chat_id]=[...messages];
                }
            });
        // .addCase(fetchMessages.pending, (state) => {
        //     state.isLoading = true;
        // });
    }
});

export const { actions: chatActions } = telegramChatSlice;
export const { reducer: chatReducer } = telegramChatSlice;