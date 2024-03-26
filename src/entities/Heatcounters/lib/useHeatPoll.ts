import { useEffect, useRef } from "react";
import { ManualPoll } from "../service/HeatDeviceService";

interface HeatHookProps {
    onUpdate:()=>void;
    id:number;
    autoPoll?:boolean;
}

export const useHeatPoll = (props:HeatHookProps):()=>Promise<void> =>{
    const {onUpdate,id,autoPoll=false } = props;
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const loop_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
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
        const response = await ManualPoll.pollDevice(Number(id));
        const task_id = response?.data?.task_id;
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(id,task_id);
            if  (response.data.result!==null) {
                clearInterval(timer_ref.current);
                timer_ref.current = null;
                pollFlag.current=false;
                onUpdate();
            }
        },2000);
    };
    return poll;
};