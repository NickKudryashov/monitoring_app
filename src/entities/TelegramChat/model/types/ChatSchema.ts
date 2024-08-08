export interface TelegramChatSchema {
    isLoading?:boolean;
    chats?: TelegramChat[]
    messagesByChat:MessagesByChat
}

export interface MessagesByChat {
    [id : number]:TelegramMessage[];
}

export interface TelegramChat {
    id:number;
    objects: number[];
    title:string;
}


interface TelegramMedia {
    filepath:string;
    width:number;
    height:number;
}

export interface TelegramMessage {
    message_id:number;
    text?:string
    photo?:TelegramMedia;
    video?:TelegramMedia;
    message_datetime?:string;
}
// Чат - айди, название
// Сообщение - Текст, Картинка, Видео