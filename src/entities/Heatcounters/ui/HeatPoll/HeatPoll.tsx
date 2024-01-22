import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatPoll.module.scss";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { getDevice, HeatDevice } from "entities/Heatcounters";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { useSelector } from "react-redux";
import {StateSchema} from "app/providers/StoreProvider/config/stateSchema";
import { Modal } from "shared/ui/Modal/Modal";
import { ManualPoll } from "entities/Heatcounters/service/HeatDeviceService";
interface HeatPollProps {
 className?: string;
 id:number;
 autoPoll:boolean;
 onUpdate?:()=>void;
}

export function HeatPoll(props: PropsWithChildren<HeatPollProps>) {
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
        if(!pollFlag.current && autoPoll){
            poll();
            const delay = 60000;
            loop_ref.current = setInterval(poll,delay);
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
        <div className={classNames(className,{},[cls.container])}>
            {!autoPoll && <AppButon theme={AppButtonTheme.SHADOW} onClick={()=>poll()}>Опросить</AppButon>}
        </div>

    );
}