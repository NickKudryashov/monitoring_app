import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TelegramChatSchema } from "../types/ChatSchema";
import { fetchChats, fetchMessages } from "../services/telegramChatActions";
import { buildSlice } from "@/shared/store";

const initialState: TelegramChatSchema = {
    isLoading: false,
    chats:[],
    messagesByChat:{},
    messages:[],
    stop:false
};

export const telegramChatSlice = buildSlice({
    name: "telegramChat",
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        clearMessages: (state) => {
            state.messages = [];
            state.isLoading = false
            state.stop = false
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
                state.messages = state.messages.concat(action.payload.messages)
                state.stop = action.payload.stop
                console.log('поймали стоп: ',action.payload.stop,state.stop)
            });
        // .addCase(fetchMessages.pending, (state) => {
        //     state.isLoading = true;
        // });
    }
});

export const { actions: chatActions } = telegramChatSlice;
export const { reducer: chatReducer } = telegramChatSlice;
export const {useActions:useTelegramChatActions} = telegramChatSlice