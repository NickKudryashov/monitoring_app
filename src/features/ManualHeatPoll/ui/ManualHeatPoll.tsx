import classNames from "shared/lib/classNames/classNames";
import cls from "./ManualHeatPoll.module.scss";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ManualPoll } from "../service/manualPollSerivce";
import { getDevice, HeatDevice } from "entities/Heatcounters";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { useSelector } from "react-redux";
import {StateSchema} from "app/providers/StoreProvider/config/stateSchema";
import { Modal } from "shared/ui/Modal/Modal";
interface ManualHeatPollProps {
 className?: string;
 device:HeatDevice;
 onUpdate?:()=>void;
}

export function ManualHeatPoll(props: PropsWithChildren<ManualHeatPollProps>) {
    const { className,device,onUpdate } = props;
    const dispatch = useAppDispatch();
    const selectedDeviceID = useSelector((state:StateSchema)=>state.heatDevices.selectedDeviceID);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const loop_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    useEffect(()=>{
        return ()=>{
            if (timer_ref.current){
                clearInterval(timer_ref.current);}
            if (loop_ref.current) {
                clearInterval(loop_ref.current);
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
            }
            if (loop_ref.current) {
                clearInterval(loop_ref.current);
            }
        };
    },[device.id]);

    useEffect(()=>{setStatus("");},[selectedDeviceID]);

    
    const  poll =  async ()=>{
        console.log("в полл");
        if (pollFlag.current ) {
            console.log("вышли из полл по условию");
            return;
        }
        console.log("работа poll");
        pollFlag.current=true;
        const response = await  ManualPoll.pollDevice(device.id);
        setIsLoading(true);
        setStatus("Идет опрос");
        const task_id = response.data.task_id;
        // setTimeout(()=>{
        //     dispatch(getDevice(device.id)).then(res=>onUpdate(res.payload));
        // },10000);
        setTimeout(()=>{
            dispatch(getDevice(device.id));            
        },2000);
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(device.id,task_id);
            if  (response.data.result!==null) {
                response.data.result === true ? setStatus("Опрос завершен успешно") : setStatus("Произошла ошибка при опросе");
                if (response.data.result) {
                    dispatch(getDevice(device.id));
                }
                if (onUpdate) {
                    onUpdate();
                }
                pollFlag.current=false;
                setIsLoading(false);
                
                clearInterval(timer_ref.current);
            }
            else {
                setIsLoading(true);
            }
        },2000);

    };
    return (
        <div className={classNames(className,{},[cls.container])}>
            {
                device && !device.autopoll &&
                <AppButon disabled={loading} theme={AppButtonTheme.SHADOW} onClick={poll} className={classNames(cls.ManualHeatPoll,{},[className,cls.btn])}>
                    {loading ?"Идет опрос..." :"Опросить прибор"}
                </AppButon>
            }
            <div className={cls.loadbox}>
                {/* {loading && <Loader/>} */}
                {/* {status} */}
            </div>
            <br/>
        </div>

    );
}