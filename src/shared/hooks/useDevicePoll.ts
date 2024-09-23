import { MutableRefObject, useEffect, useRef, useState } from "react";
import $api from "../api";
import { AxiosResponse } from "axios";

export interface TaskResponse {
    result:boolean;
}

export interface TaskRequest {
    task_id:string;
}

interface PollHookProps {
    onUpdate:()=>void;
    pollDevice:(id:number)=>Promise<AxiosResponse<TaskRequest>>
    id:number;
    autoPoll?:boolean;
    initialBusy?:boolean;
}




const getTaskStatus = async (id:number,task_id:string)=> {
    return $api.put<TaskResponse>(`heatpoll/${id}`,{task_id:task_id});
}


export const usePoll = (props:PollHookProps):[()=>Promise<void>,boolean] =>{
    const {onUpdate,id,autoPoll=false,initialBusy=false,pollDevice } = props;
    const timer_ref = useRef<ReturnType <typeof setInterval>>() as MutableRefObject<ReturnType <typeof setInterval>| null>;
    const loop_ref = useRef<ReturnType <typeof setInterval>>() as MutableRefObject<ReturnType <typeof setInterval>| null>;
    const [isBusy,setIsBusy] = useState<boolean>(initialBusy)
    const pollFlag = useRef<boolean>();
    const busyRef = useRef<boolean>(initialBusy);
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
        setIsBusy(initialBusy)
    },[initialBusy])
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
        if (timer_ref.current) {
            return;
        }
        setIsBusy(true)
        pollFlag.current=true;
        const response = await pollDevice(Number(id));
        const task_id = response?.data?.task_id;
        timer_ref.current = setInterval(async ()=>{
            const response = await getTaskStatus(id,task_id);
            if  (response.data.result!==null) {
                if (timer_ref.current) {
                    clearInterval(timer_ref.current);
                }
                timer_ref.current = null;
                pollFlag.current=false;
                onUpdate();
                setIsBusy(false)
            }
        },2000);
    };
    return [poll,isBusy];
};