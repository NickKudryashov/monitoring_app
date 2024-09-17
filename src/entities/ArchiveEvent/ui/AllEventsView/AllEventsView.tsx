import {
    MutableRefObject,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import cls from "./AllEventsView.module.scss";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { archiveEventsActions } from "../../model/slice/slice";
import { fetchEvents } from "../../model/service/fetchEvents";
export const AllEventsView = (): ReactElement => {
    const [startOffset, setStartOffset] = useState(0);
    const { events } = useSelector((state: StateSchema) => state.archiveEvents);
    const dispatch = useAppDispatch();
    const wrapRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        dispatch(archiveEventsActions.clearEvents());
    }, []);

    const onScrollCallback = () => {
        setStartOffset((prev) => prev + 20);
        dispatch(fetchEvents({ offset: startOffset }));
        wrapRef.current.scrollTop -= 50;
    };

    const debounced = useDebounce(onScrollCallback, 1000);
    useInfinityScroll({ callback: debounced, triggerRef, wrapperRef: wrapRef });

    return (
        <VFlexBox
            width="95%"
            alignItems="center"
            height="70%"
            data-testid="ArchiveAllEventsView"
            ref={wrapRef}
            className={cls.modalWin}
        >
            <VFlexBox gap="10px">
                {events?.map((el) => (
                    <VFlexBox
                        className={cls.eventrow}
                        gap="3px"
                        height="7%"
                        key={el.id}
                    >
                        <p>{`${el.event_datetime} ${el.user_object_info}`}</p>
                        <p>{`${el.system} ${el.message}`}</p>
                    </VFlexBox>
                ))}
                {(events === undefined || events?.length === 0) && (
                    <p data-testid="ArchivesEventEmptyText">
                        События отсутствуют
                    </p>
                )}
            </VFlexBox>
            <div className={cls.trigger} ref={triggerRef} />
        </VFlexBox>
    );
};
