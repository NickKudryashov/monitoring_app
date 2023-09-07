import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useRef, useState } from "react";
import cls from "./Footer.module.scss";

import type { PropsWithChildren } from "react";
import { EventAnswer } from "shared/types/eventTypes";

interface FooterProps {
 className?: string;
 pollCallback?:()=>Promise<EventAnswer>;
}

export const Footer = memo((props: PropsWithChildren<FooterProps>) => {
    const { className,pollCallback } = props;
    const [events,setEvents] = useState<string[]>([]);
    const intervalRef = useRef<ReturnType <typeof setInterval>>(null);

    const fetchEvents =  async ()=>{
        const temp = await pollCallback();
        setEvents(temp.events);
    };

    useEffect(()=>{
        if (pollCallback) {
            fetchEvents();
            intervalRef.current = setInterval(fetchEvents,2000);
            return ()=>{
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setEvents([]);
            };
        }
        
    },[pollCallback]);
    return (
        <div className={classNames(cls.Footer,{},[className])}>
            {
                events.map((el,i)=>
                    <p key={i}>{el}</p>
                )
            }
            ver 3.0.0 17.08.2023
        </div>
    );
});
