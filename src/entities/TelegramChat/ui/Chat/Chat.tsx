import classNames from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import cls from "./Chat.module.scss";

import type { MutableRefObject, PropsWithChildren } from "react";
import { useAppDispatch } from "@/shared/hooks/hooks";
import {
    chatActions,
    useTelegramChatActions,
} from "../../model/slice/ChatSlice";
import { fetchMessages } from "../../model/services/telegramChatActions";
import { useSelector } from "react-redux";
import { TelegramChat, TelegramMessage } from "../../model/types/ChatSchema";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Loader } from "@/shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "@/shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import {
    getChatsIsLoading,
    getMessages,
    getStop,
    useGetTelegramChats,
} from "../../model/selectors/selector";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
const STATIC = __IS_DEV__ ? "http://localhost" : "https://avs.eco";
interface ChatProps {
    className?: string;
    obj_id: number;
}

const returnDay = (date: string | undefined) => {
    if (!date) {
        return 0;
    }
    const dateString = date.split("T")[0];
    const day = dateString.split("-")[2];
    return day;
};
const returnDate = (date: string): string => {
    const dateString = date.split("T")[0].split("-");
    const day = dateString[2] + "." + dateString[1] + "." + dateString[0];
    return day;
};

const CURRENT_DATE = new Date().toJSON().slice(0, 10);

export const Chat = memo((props: PropsWithChildren<ChatProps>) => {
    const { className = "", obj_id } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getChatsIsLoading);
    const stop = useSelector((state: StateSchema) => state.chats.stop);
    const chats = useGetTelegramChats();
    const messages = useSelector(getMessages);
    const chatArray = chats.filter((el) => el.objects.includes(obj_id));
    const chatAvailable = chatArray.length;
    const wrapRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [showMedia, setShowMedia] = useState(true);
    const [photoModal, setPhotoModal] = useState(false);
    const [allMediaModal, setAllMediaModal] = useState(false);
    const stopFetch = useRef<boolean>(false);
    const offset = useRef(0);
    const [imagePath, setImagePath] = useState("");
    const [currentDate, setCurrentDate] = useState(CURRENT_DATE);
    const [currentChat, setCurrentChat] = useState<TelegramChat | null>();
    useEffect(() => {
        dispatch(chatActions.clearMessages());
        offset.current = 0;
        stopFetch.current = false;
        if (chatAvailable) {
            const temp = chats.filter((el) => el.objects.includes(obj_id))[0];
            setCurrentChat(temp);
            if (currentChat?.id) {
                dispatch(
                    fetchMessages({
                        chat_id: currentChat?.id,
                        offset: offset.current,
                        start_datetime: currentDate,
                    }),
                );
                offset.current += 18;
            }
        }
    }, [currentChat?.id, dispatch, obj_id, currentDate]);
    const photoClickHandler = (path: string | undefined) => {
        if (!path) {
            return;
        }
        setImagePath(path);
        setPhotoModal(true);
    };
    const scrollCallback = () => {
        console.log(!isLoading, currentChat?.id, chatAvailable, stop);
        if (!isLoading && currentChat?.id && chatAvailable && !stop) {
            console.log("Изменили оффсет");
            dispatch(
                fetchMessages({
                    chat_id: currentChat?.id,
                    offset: offset.current,
                    start_datetime: currentDate,
                }),
            );
            offset.current += 18;

            wrapRef.current.scrollTop -= 50;
        }
    };
    const debouncedScrollCallback = useDebounce(scrollCallback, 1000);
    useInfinityScroll({
        callback: debouncedScrollCallback,
        triggerRef: triggerRef,
        wrapperRef: wrapRef,
    });

    const checkMessageToRender = (msg: TelegramMessage, date: string) => {
        if (msg.photo && showMedia) {
            return true;
        } else if (msg.video && showMedia) {
            return true;
        } else if (msg.text) {
            return true;
        } else {
            return false;
        }
    };
    return (
        <div ref={wrapRef} className={classNames(cls.Chat, {}, [className])}>
            <Modal
                isOpen={allMediaModal}
                onClose={() => setAllMediaModal(false)}
            >
                <div className={cls.allMedia}>
                    {messages &&
                        messages.map((el, i) => (
                            <div key={el.message_id}>
                                <div className={cls.msg} key={el.message_id}>
                                    {el.photo && showMedia && (
                                        <img
                                            className={cls.media}
                                            onClick={() =>
                                                photoClickHandler(
                                                    STATIC +
                                                        el?.photo?.filepath,
                                                )
                                            }
                                            src={STATIC + el.photo.filepath}
                                        />
                                    )}
                                    {el.video && showMedia && (
                                        <video
                                            className={cls.media}
                                            controls
                                            src={STATIC + el.video.filepath}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </Modal>
            <Modal
                className={cls.maxPhotoBox}
                isOpen={photoModal}
                onClose={() => setPhotoModal(false)}
            >
                <img className={cls.maxPhoto} src={imagePath} />
            </Modal>
            <div className={cls.chatBtns}>
                <AppButon
                    className={cls.btn}
                    theme={AppButtonTheme.SHADOW}
                    onClick={() => setShowMedia(!showMedia)}
                >
                    {showMedia ? "Выключить медиа" : "Включить медиа"}
                </AppButon>
                <AppButon
                    className={cls.btn}
                    theme={AppButtonTheme.SHADOW}
                    onClick={() => setAllMediaModal(true)}
                >
                    {"Показать все медиа"}
                </AppButon>
                <AppInput
                    type="date"
                    width={"200px"}
                    theme={InputThemes.SHADOW}
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                />
                <AppButon
                    className={cls.btn}
                    theme={AppButtonTheme.SHADOW}
                    onClick={() => setCurrentDate("")}
                >
                    {"Сбросить дату"}
                </AppButon>
            </div>
            <div className={cls.chatBox}>
                {messages &&
                    messages.map((el, i) => (
                        <div key={el.message_id}>
                            {checkMessageToRender(el, currentDate) &&
                                messages[i] &&
                                el.message_datetime && (
                                    <div>
                                        {i === 0 && (
                                            <p className={cls.dateMarker}>
                                                {returnDate(
                                                    el?.message_datetime,
                                                )}
                                            </p>
                                        )}
                                        {i !== 0 &&
                                            messages[i - 1] &&
                                            returnDay(
                                                messages[i].message_datetime,
                                            ) !==
                                                returnDay(
                                                    messages[i - 1]
                                                        .message_datetime,
                                                ) && (
                                                <p className={cls.dateMarker}>
                                                    {returnDate(
                                                        el?.message_datetime,
                                                    )}
                                                </p>
                                            )}
                                        <div
                                            className={cls.msg}
                                            key={el.message_id}
                                        >
                                            {el.photo && showMedia && (
                                                <img
                                                    className={cls.media}
                                                    onClick={() =>
                                                        photoClickHandler(
                                                            STATIC +
                                                                el?.photo
                                                                    ?.filepath,
                                                        )
                                                    }
                                                    src={
                                                        STATIC +
                                                        el.photo.filepath
                                                    }
                                                />
                                            )}
                                            {el.video && showMedia && (
                                                <video
                                                    className={cls.media}
                                                    controls
                                                    src={
                                                        STATIC +
                                                        el.video.filepath
                                                    }
                                                />
                                            )}
                                            {el.text && (
                                                <p className={cls.text_message}>
                                                    {el.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    ))}
                {isLoading && <Loader />}
                <div ref={triggerRef} />
            </div>
        </div>
    );
});

Chat.displayName = "TelegramChat";
