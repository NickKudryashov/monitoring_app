import classNames from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
import cls from "./Chat.module.scss";

import type { MutableRefObject, PropsWithChildren } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { chatActions } from "entities/TelegramChat/model/slice/ChatSlice";
import { fetchChats, fetchMessages } from "entities/TelegramChat/model/services/telegramChatActions";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { TelegramChat, TelegramMessage } from "entities/TelegramChat/model/types/ChatSchema";
import { useInfinityScroll } from "shared/hooks/useInfinityScroll";
import { useDebounce } from "shared/hooks/useDebounce";
import { Modal } from "shared/ui/Modal/Modal";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { forceReRender } from "@storybook/react";
const STATIC = __IS_DEV__ ? "http://localhost:8000" : "http://avs.eco:8000";
interface ChatProps {
 className?: string;
 obj_id:number;
 currentChat:TelegramChat
}

const returnDay = (date:string)=> {
    const dateString = date.split("T")[0];
    const day = dateString.split("-")[2];
    return day;
};
const returnDate = (date:string):string=> {
    const dateString = date.split("T")[0].split("-");
    const day = dateString[2]+"."+dateString[1]+"."+dateString[0];
    return day;
};

export const Chat = memo((props: PropsWithChildren<ChatProps>) => {
    const { className,obj_id,currentChat } = props;
    const dispatch = useAppDispatch();
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const {chats,isLoading} = useSelector((state:StateSchema)=>state.chats);
    const messagesById = useSelector((state:StateSchema)=>state.chats.messagesByChat);
    const [startOffset,setStartOffset] = useState(0);
    const chatArray = chats.filter((el)=>el.objects.includes(obj_id));
    const chatAvailable = chatArray.length;
    const wrapRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef()  as MutableRefObject<HTMLDivElement>;
    const [showMedia,setShowMedia] = useState(true);
    const [photoModal,setPhotoModal] = useState(false); 
    const [allMediaModal,setAllMediaModal] = useState(false); 
    const [imagePath,setImagePath] = useState("");
    const [currentDate,setCurrentDate] = useState("");
    // const [currentChat,setCurrentChat] = useState<TelegramChat | null>();
    console.log("Айди обхекта: ",obj_id);
    console.log("Текущий чат: ",currentChat);

    useEffect(()=>{
        // setStartOffset(0);
        forceUpdate();
    },[currentChat]);

    useEffect(()=>{
        dispatch(chatActions.setIsLoading(true));

        if (chatAvailable && currentChat) {
            const temp = chats.filter((el)=>el.objects.includes(obj_id))[0];
            if (currentChat.id && !messagesById[currentChat.id]?.length) {
                // console.log("запрашиваем сообщения на чат ",currentChat.id);
                dispatch(fetchMessages({chat_id:currentChat.id,offset:0}));
                setStartOffset(prev=>prev+15);
                // console.log("перерисовка и оффсет 0");
            }
            else {
                dispatch(chatActions.setIsLoading(false));
            }
        }},[chatAvailable, chats, currentChat, currentChat.id, dispatch, messagesById, obj_id]);
    const photoClickHandler = (path:string)=>{
        setImagePath(path);
        setPhotoModal(true);
    };

    const checker = (id:number)=>{
        // console.log( messagesById[currentChat.id]);
        // console.log("Айди чата в рендере: ",currentChat.id);
        return true;
    };

    const scrollCallback = useCallback(() => {
        const temp = {
            isLoading,
            chat_id: currentChat?.id,
            currentDate,
            chatAvailable
        };
        console.log(temp);
        if (!isLoading && currentChat.id && !currentDate && chatAvailable) {
            dispatch(chatActions.setIsLoading(true));
            dispatch(fetchMessages({chat_id:currentChat.id,offset:startOffset}));
            setStartOffset(prev=>prev+15);

            wrapRef.current.scrollTop-=50;
            console.log("CALLBACK SCROLL");
        }
    },[chatAvailable, currentChat.id, currentDate, dispatch, isLoading, startOffset]);
    const debouncedScrollCallback = useDebounce(scrollCallback,1000);
    useInfinityScroll({callback:debouncedScrollCallback,triggerRef:triggerRef,wrapperRef:wrapRef});

    const checkMessageToRender = (msg:TelegramMessage,date:string)=>{
        if (date && !msg.message_datetime.includes(date)) {
            return false;
        }
        if (msg.photo && showMedia){
            return true;
        }
        else if (msg.video && showMedia){
            return true;
        }
        else if (msg.text) {
            return true;
        }
        else {
            return false;
        }
    };
    const content = (
        
        messagesById[currentChat.id] && messagesById[currentChat.id].map((el,i)=>
            <div key={el.message_id}>
                { checkMessageToRender(el,currentDate) &&  checker(0) &&
                    <div>
                        {i===0 &&
                            <p className={cls.dateMarker}>{returnDate(el?.message_datetime)}</p>
                        }
                        {i!==0 && messagesById[currentChat.id][i-1] && 
                        returnDay(messagesById[currentChat.id][i].message_datetime)!==returnDay(messagesById[currentChat.id][i-1].message_datetime) && 
                        <p className={cls.dateMarker}>{returnDate(el?.message_datetime)}</p>
                        }
                        <div className={cls.msg}  key={el.message_id}>
                            

                            {el.photo && showMedia && <img className={cls.media} onClick={()=>photoClickHandler(STATIC+el.photo.filepath)}  src={STATIC+el.photo.filepath}  />}
                            {el.video && showMedia && <video className={cls.media}  controls src={STATIC+el.video.filepath}  />}
                            {el.text && <b>{el.text}</b>}
                        </div>
                    </div>
                }
            </div>
        )
    
    );
    return (
        <div ref={wrapRef} className={classNames(cls.Chat,{},[className])}>
            
            
            <Modal isOpen={allMediaModal} onClose={()=>setAllMediaModal(false)}>
                <div className={cls.allMedia}>
                    { 
                        messagesById[currentChat.id] && checker(0) && messagesById[currentChat.id].map((el,i)=>
                            <div key={el.message_id}>
                                <div className={cls.msg}  key={el.message_id}>
                                    {el.photo && showMedia && <img className={cls.media} onClick={()=>photoClickHandler(STATIC+el.photo.filepath)}   src={STATIC+el.photo.filepath}  />}
                                    {el.video && showMedia && <video className={cls.media}  controls src={STATIC+el.video.filepath}  />}
                                </div>
                            </div>
                        )
                    }
                </div>
            </Modal>
            <Modal className={cls.maxPhotoBox} isOpen={photoModal} onClose={()=>setPhotoModal(false)}>
                <img className={cls.maxPhoto} src={imagePath}/>
            </Modal>
            <div className={cls.chatBox}>
                
                {/* {`Доступен чат: ${currentChat.title}`} */}
                {content}
                {isLoading && <Loader/>}
                <div ref={triggerRef} />

            </div>
            <div className={cls.chatBtns}>
                <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>setShowMedia(!showMedia)}>{showMedia ? "Выключить медиа" : "Включить медиа"}</AppButon>
                <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>setAllMediaModal(true)} >{"Показать все медиа"}</AppButon>
                <AppInput type='date' value={currentDate} onChange={(e)=>setCurrentDate(e.target.value)} />
                <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>setCurrentDate("")} >{"Сбросить дату"}</AppButon>
            </div>
        </div>
    );
});
