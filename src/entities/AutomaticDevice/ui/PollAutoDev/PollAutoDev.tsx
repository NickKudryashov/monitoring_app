import classNames from "shared/lib/classNames/classNames";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { ManualPoll } from "entities/AutomaticDevice/model/service/pollService";
interface AutoPollProps {
 className?: string;
 id:number;
 autoPoll:boolean;
 onUpdate?:()=>void;
}

export function AutoPoll(props: PropsWithChildren<AutoPollProps>) {
    const { className,onUpdate,id,autoPoll } = props;
    const dispatch = useAppDispatch();
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const loop_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    useEffect(()=>{
        return ()=>{
            if (timer_ref.current){
                clearInterval(timer_ref.current);
                timer_ref.current = null;
            }
            if (loop_ref.current) {
                clearInterval(loop_ref.current);
                loop_ref.current = null;
            }
        };
    },[]);
    useEffect(()=>{
        if(!pollFlag.current){
            poll();
            loop_ref.current = setInterval(poll,60000);
        }
        setIsLoading(pollFlag.current);
        return ()=>{
            pollFlag.current=false;
            if (timer_ref.current){
                clearInterval(timer_ref.current);
                timer_ref.current = null;
            }
            if (loop_ref.current) {
                clearInterval(loop_ref.current);
                loop_ref.current = null;
            }
        };
    },[id]);

    useEffect(()=>{setStatus("");},[id]);

    
    const  poll =  async ()=>{
        if (timer_ref.current ) {
            return;
        }
        pollFlag.current=true;
        const response = await ManualPoll.pollDevice(Number(id));
        setIsLoading(true);
        const task_id = response.data.task_id;
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(id,task_id);
            if  (response.data.result!==null) {
                clearInterval(timer_ref.current);
                timer_ref.current = null;
                pollFlag.current=false;
                setIsLoading(false);
                onUpdate();
            }
        },2000);

    };
    return (
        <div className={classNames(className,{},[])}>

        </div>

    );
}