import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getTelegramChats = (state:StateSchema)=>state.chats.chats || [];
export const getChatsIsLoading = (state:StateSchema)=>state.chats.isLoading;
export const getMessageBuChats = (state:StateSchema)=>state.chats.messagesByChat;