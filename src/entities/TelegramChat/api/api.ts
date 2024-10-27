import { rtkApi } from "@/shared/api/rtkApi";
import { TelegramMessage } from "../model/types/ChatSchema";

interface MessagesFetchProps {
    offset:number;
    chat_id:number;
    start_datetime?:string;
}

const telegramChatQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMessagesByChat:build.query<{messages:TelegramMessage[],stop:boolean},MessagesFetchProps>({
            query: ({chat_id,...rest}) =>{
                return {
                    url:`chat/messages/${chat_id}`,
                    method:'POST',
                    body:rest
                };
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems,{arg}) => {
                currentCache.messages.push(...newItems.messages)
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return (currentArg?.start_datetime !== previousArg?.start_datetime) || (currentArg?.chat_id !== previousArg?.chat_id)
            },
        }),
    }),
    overrideExisting: false,
});

export const useGetTelegramMessages = telegramChatQuery.useGetMessagesByChatQuery;