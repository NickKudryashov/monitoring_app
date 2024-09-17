import { MutableRefObject, useEffect, useRef } from "react";

interface HeatHookProps {
    onUpdate:()=>void;
    id:number;
    autoPoll?:boolean;
}

import $api from "@/shared/api";
export interface TaskResponse {
    result:boolean;
}

export interface TaskRequest {
    task_id:string;
}
export class ManualPoll {
    static async pollDevice(id:number){
        return $api.post<TaskRequest>(`electropoll/${id}`);
    }

    static async getTaskStatus(id:number,task_id:string) {
        return $api.put<TaskResponse>(`electropoll/${id}`,{task_id:task_id});
    }
}


export const useElectroPoll = (props:HeatHookProps):()=>Promise<void> =>{
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
        const response = await ManualPoll.pollDevice(Number(id));
        const task_id = response.data.task_id;
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(id,task_id);
            if  (response.data.result!==null) {
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