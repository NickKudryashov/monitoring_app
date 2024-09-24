import classNames from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import cls from "./FooterWithoutPanel.module.scss";
import type { MutableRefObject, PropsWithChildren } from "react";
import { EventAnswer } from "@/shared/types/eventTypes";
import { VFlexBox } from "../FlexBox/VFlexBox/VFlexBox";
import { useViewportCheck } from "@/shared/hooks/useCheckInViewport";

interface FooterWithoutPanelProps {
    className?: string;
    pollCallback?: () => Promise<EventAnswer>;
}

export const FooterWithoutPanel = memo(
    (props: PropsWithChildren<FooterWithoutPanelProps>) => {
        const { className = "", pollCallback } = props;
        const [events, setEvents] = useState<EventAnswer>([]);
        const intervalRef = useRef<ReturnType<typeof setInterval>>(
            null,
        ) as MutableRefObject<ReturnType<typeof setInterval>>;
        const footRef = useRef<HTMLDivElement>(
            null,
        ) as MutableRefObject<HTMLDivElement>;
        const wrapRef = useRef<HTMLDivElement>(
            null,
        ) as MutableRefObject<HTMLDivElement>;
        const scrollOnLoad = useRef<boolean>(true);
        const inView = useViewportCheck({
            triggerRef: footRef,
            wrapperRef: wrapRef,
        });
        const fetchEvents = async () => {
            if (!pollCallback) {
                return;
            }
            const events = await pollCallback();
            if (!events) {
                return;
            }
            setEvents(events);
            if (scrollOnLoad.current && footRef.current) {
                setTimeout(
                    () =>
                        footRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "nearest",
                        }),
                    100,
                );
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
            <VFlexBox
                onScroll={(e) => e.stopPropagation()}
                className={classNames(cls.Footer, {}, [className])}
                alignItems="start"
                ref={wrapRef}
            >
                {events.map((el, i) => (
                    <p key={el.id}>{el.message}</p>
                ))}
                <div ref={footRef} />
            </VFlexBox>
        );
    },
);

FooterWithoutPanel.displayName = "FooterClear";
