import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject, PropsWithChildren } from "react";
import { EventAnswer } from "@/shared/types/eventTypes";
import { Panel } from "react-resizable-panels";
import { useViewportCheck } from "@/shared/hooks/useCheckInViewport";
import { VFlexBox } from "../FlexBox/VFlexBox/VFlexBox";
import classNames from "@/shared/lib/classNames/classNames";
import cls from "./Footer.module.scss";
interface FooterProps {
    className?: string;
    pollCallback?: () => Promise<EventAnswer>;
}

export const Footer = memo((props: PropsWithChildren<FooterProps>) => {
    const { className = "", pollCallback } = props;
    const [events, setEvents] = useState<EventAnswer>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(
        null,
    ) as MutableRefObject<ReturnType<typeof setInterval>>;
    const footRef =
        useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const wrapRef =
        useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const scrollOnLoad = useRef<boolean>(true);
    // const inView = useRef<boolean>(true);
    // const setInView = useCallback((arg: boolean) => {
    //     inView.current = arg;
    // }, []);
    const inView = useViewportCheck({
        triggerRef: footRef,
        wrapperRef: wrapRef,
    });
    const fetchEvents = useCallback(async () => {
        if (!pollCallback) {
            return;
        }
        const events = await pollCallback();
        if (!events) {
            return;
        }
        setEvents(events);
        if (
            (scrollOnLoad.current ||
                wrapRef.current.scrollHeight - wrapRef.current.scrollTop <=
                    101) &&
            footRef.current
        ) {
            setTimeout(() => {
                if (wrapRef.current) {
                    wrapRef.current.scrollTo({
                        top: wrapRef.current.scrollHeight,
                        behavior: "smooth",
                    });
                }
            }, 100);
            scrollOnLoad.current = false;
        }
    }, [pollCallback]);

    useEffect(() => {
        if (pollCallback) {
            fetchEvents();
            intervalRef.current = setInterval(fetchEvents, 2500);

            return () => {
                scrollOnLoad.current = true;
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setEvents([]);
            };
        }
    }, [pollCallback, fetchEvents]);
    return (
        <Panel
            style={{ overflowY: "hidden" }}
            id={"footer"}
            order={2}
            defaultSize={15}
            minSize={15}
            maxSize={40}
        >
            <VFlexBox
                onScroll={(e) => e.stopPropagation()}
                className={classNames(cls.Footer, {}, [className])}
                alignItems="start"
                ref={wrapRef}
            >
                {events.map((el, i) => (
                    <p key={el.id}>{el.message}</p>
                ))}
                <div style={{ width: "1px", height: "1px" }} ref={footRef} />
            </VFlexBox>
        </Panel>
    );
});

Footer.displayName = "ResizableFooter";
