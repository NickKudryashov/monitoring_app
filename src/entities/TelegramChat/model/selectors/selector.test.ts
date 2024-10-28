import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getChatsIsLoading, getTelegramChats } from "./selector";
import { MessagesByChat, TelegramChat } from "../types/ChatSchema";

const MOCK_CHATS:TelegramChat[] = [
    {
        id:1,
        objects:[1,2,3,4],
        title:"Название 1"
    },
    {
        id:2,
        objects:[5,],
        title:"Название 2"
    },
    {
        id:3,
        objects:[1,],
        title:"Название 3"
    },
];

const msgs:MessagesByChat = {
    1:[
        {message_id:1,message_datetime:"123",photo:{filepath:"sds",height:100,width:100}},
        {message_id:2,message_datetime:"123",photo:{filepath:"sds",height:100,width:100},video:{filepath:"111",height:100,width:100}}
    ],2:[
        {message_id:3,message_datetime:"123",photo:{filepath:"sds",height:100,width:100}},
        {message_id:4,message_datetime:"123",photo:{filepath:"sds",height:100,width:100},video:{filepath:"111",height:100,width:100}},
        {message_id:4,message_datetime:"123",photo:{filepath:"sds",height:100,width:100},video:{filepath:"111",height:100,width:100},text:"aboba"},
    ]
};

describe("tg chat is loading",()=>{
    test("only selected object",()=>{
        const state:DeepPartial<StateSchema> = {chats:{}};
        expect(getChatsIsLoading(state as StateSchema)).toBeUndefined();
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {chats:{isLoading:true}};
        expect(getChatsIsLoading(state as StateSchema)).toBe(true);
    });
    test("only list",()=>{
        const state:DeepPartial<StateSchema> = {chats:{isLoading:false}};
        expect(getChatsIsLoading(state as StateSchema)).toBe(false);
    });
});




describe("tg chats",()=>{
    test("positive",()=>{
        const state:DeepPartial<StateSchema> = {chats:{chats:MOCK_CHATS}};
        expect(getTelegramChats(state as StateSchema)).toEqual(MOCK_CHATS);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {chats:{isLoading:true}};
        expect(getTelegramChats(state as StateSchema)).toEqual([]);
    });
    test("only list",()=>{
        const state:DeepPartial<StateSchema> = {chats:{isLoading:false}};
        expect(getTelegramChats(state as StateSchema)).toEqual([]);
    });
});


// describe("tg messages by chat",()=>{
//     test("positive",()=>{
//         const state:DeepPartial<StateSchema> = {chats:{chats:MOCK_CHATS,messagesByChat:msgs}};
//         expect(getMessageBuChats(state as StateSchema)).toEqual(msgs);
//     });
//     test("empty",()=>{
//         const state:DeepPartial<StateSchema> = {chats:{isLoading:true,chats:MOCK_CHATS}};
//         expect(getMessageBuChats(state as StateSchema)).toBeUndefined();
//     });
// });