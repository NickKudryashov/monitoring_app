import { getArchivesEvents } from "entities/ArchiveEvent/api/api";
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";
import { useDebounce } from "shared/hooks/useDebounce";
import { useInfinityScroll } from "shared/hooks/useInfinityScroll";
import cls from "./AllEventsView.module.scss";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { archiveEventsActions } from "entities/ArchiveEvent/model/slice/slice";
import { fetchEvents } from "entities/ArchiveEvent/model/service/fetchEvents";
export const AllEventsView = ():ReactElement=>{
    const [startOffset,setStartOffset] = useState(0);
    const {events} = useSelector((state:StateSchema)=>state.archiveEvents);
    const dispatch = useAppDispatch();
    const wrapRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef()  as MutableRefObject<HTMLDivElement>;

    useEffect(()=>{
        dispatch(archiveEventsActions.clearEvents());
    },[]);

    const onScrollCallback = ()=>{
        setStartOffset((prev)=>prev+20);
        dispatch(fetchEvents({offset:startOffset}));
        wrapRef.current.scrollTop-=50;
    };

    const debounced = useDebounce(onScrollCallback,1000);
    useInfinityScroll({callback:debounced,triggerRef,wrapperRef:wrapRef});

    return (
        <VFlexBox width="90%" height="60%" ref={wrapRef} className={cls.modalWin}>
            <VFlexBox>
                {   
                    events?.map(
                        el=>
                            <p className={cls.eventrow} key={el.id}>{`${el.event_datetime} ${el.system} ${el.message}`}</p>
                    )                       
                }
                {(events===undefined || events?.length===0)&&
                <p>События отсутствуют</p>
                }
            </VFlexBox>                
            <div className={cls.trigger} ref={triggerRef} />
        </VFlexBox>
    );
};