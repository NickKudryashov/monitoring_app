import classNames from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import cls from "./Footer.module.scss";
import type { PropsWithChildren } from "react";
import { EventAnswer } from "shared/types/eventTypes";
import { Panel } from "react-resizable-panels";
import { useInfinityScroll } from "shared/hooks/useInfinityScroll";
import { VFlexBox } from "../FlexBox/VFlexBox/VFlexBox";
import { useViewportCheck } from "shared/hooks/useCheckInViewport";

interface FooterProps {
    className?: string;
    pollCallback?: () => Promise<EventAnswer>;
}

export const Footer = memo((props: PropsWithChildren<FooterProps>) => {
    const { className, pollCallback } = props;
    const [events, setEvents] = useState<string[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
    const footRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const scrollOnLoad = useRef<boolean>(true);
    const inView = useRef<boolean>(true);
    const setInView = useCallback((arg: boolean) => { inView.current = arg; }, []);
    useViewportCheck({ changeStatus: setInView, triggerRef: footRef, wrapperRef: wrapRef });
    const fetchEvents = async () => {
        const temp = await pollCallback();
        setEvents(temp.events);
        if (scrollOnLoad.current || inView.current) {
            footRef.current.scrollIntoView({ behavior: "smooth" });
            scrollOnLoad.current = false;
        }
    };

    useEffect(() => {
        if (pollCallback) {
            fetchEvents();
            intervalRef.current = setInterval(fetchEvents, 2000);

            return () => {
                scrollOnLoad.current = true;
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setEvents([]);
            };
        }

    }, [pollCallback]);
    return (
        <Panel style={{ "overflowY": "auto" }} id={"footer"} order={2} className={classNames(cls.Footer, {}, [className])} defaultSize={20} minSize={20} maxSize={40}>
            <VFlexBox alignItems="start" ref={wrapRef}>
                {
                    events.map((el, i) =>
                        <p key={i}>{el}</p>
                    )
                }
                <div ref={footRef} />
            </VFlexBox>

        </Panel>
    );
});
