import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { buildSelector } from "@/shared/store";

export const [useGetTelegramChats,getTelegramChats] = buildSelector((state:StateSchema)=>state.chats.chats || []);
export const [useGetChatIsLoading,getChatsIsLoading] = buildSelector((state:StateSchema)=>state.chats.isLoading);
export const [useGetMessagesByChat,getMessageBuChats] = buildSelector((state:StateSchema)=>state.chats.messagesByChat);