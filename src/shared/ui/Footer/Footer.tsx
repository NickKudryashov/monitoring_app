import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useRef, useState } from "react";
import cls from "./Footer.module.scss";
import type { PropsWithChildren } from "react";
import { EventAnswer } from "shared/types/eventTypes";
import { Panel } from "react-resizable-panels";

interface FooterProps {
 className?: string;
 pollCallback?:()=>Promise<EventAnswer>;
}

export const Footer = memo((props: PropsWithChildren<FooterProps>) => {
    const { className,pollCallback } = props;
    const [events,setEvents] = useState<string[]>([]);
    const intervalRef = useRef<ReturnType <typeof setInterval>>(null);
    const footRef = useRef<HTMLDivElement>(null);
    const scrollOnLoad = useRef<boolean>(true);
    const fetchEvents =  async ()=>{
        const temp = await pollCallback();
        setEvents(temp.events);
        if (scrollOnLoad.current) {
            footRef.current.scrollIntoView({behavior:"smooth"});
            scrollOnLoad.current = false;
        }
    };

    useEffect(()=>{
        if (pollCallback) {
            fetchEvents();
            intervalRef.current = setInterval(fetchEvents,2000);

            return ()=>{
                scrollOnLoad.current = true;
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setEvents([]);
            };
        }
        
    },[pollCallback]);
    return (
        <Panel style={{"overflowY":"auto"}} id={"footer"} order={2} className={classNames(cls.Footer,{},[className])} defaultSize={25}  maxSize={40}>

            {
                events.map((el,i)=>
                    <p key={i}>{el}</p>
                )
            }
            ver 3.0.0 17.08.2023
            <div ref={footRef}/>
        </Panel>
    );
});
