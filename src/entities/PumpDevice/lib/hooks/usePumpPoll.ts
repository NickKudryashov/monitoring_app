import { MutableRefObject, useEffect, useRef } from "react";
import $api from "shared/api";
import { PumpPollResponse } from "../../model/types/pumpDevice";

interface HeatHookProps {
    onUpdate:()=>void;
    id:number;
    autoPoll?:boolean;
}

export const usePumpPoll = (props:HeatHookProps):()=>Promise<void> =>{
    const {onUpdate,id,autoPoll=false } = props;
    const timer_ref = useRef<ReturnType <typeof setInterval>>() as MutableRefObject<ReturnType <typeof setInterval> | null>;
    const loop_ref = useRef<ReturnType <typeof setInterval>>() as MutableRefObject<ReturnType <typeof setInterval> | null>;
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    console.log("В хуке: ",id,autoPoll);
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
        if(!pollFlag.current && autoPoll){
            poll();
            const delay = 60000;
            loop_ref.current = setInterval(poll,delay);
        }
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
    },[id,autoPoll]);


    
    const  poll =  async ()=>{
        if (timer_ref.current ) {
            return;
        }
        pollFlag.current=true;
        const response = await $api.post<{task_id:string}>("pump/poll/"+id);
        const task_id = response?.data.task_id;
        timer_ref.current = setInterval(async ()=>{
            const response = await $api.put<PumpPollResponse>("pump/poll/"+id,{task_id:task_id});
            if  (response?.data!==null) {
                if (timer_ref.current) {
                    clearInterval(timer_ref.current);
                }   
                timer_ref.current = null;
                pollFlag.current=false;
                onUpdate();
            }
        },2000);
    };
    return poll;
};