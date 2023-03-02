import classNames from "shared/lib/classNames/classNames";
import cls from "./ManualHeatPoll.module.scss";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ManualPoll } from "../service/manualPollSerivce";
import { getDevice, getDevices, HeatDevice } from "entities/Heatcounters";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { PayloadAction } from "@reduxjs/toolkit";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

interface ManualHeatPollProps {
 className?: string;
 device:HeatDevice;
 onUpdate:(device:any)=>void;
}

export function ManualHeatPoll(props: PropsWithChildren<ManualHeatPollProps>) {
    const { className,device,onUpdate } = props;
    const dispatch = useAppDispatch();
    const {devices,selectedDevice} = useAppSelector(state=>state.heatDeviceReducer);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    
    useEffect(()=>{
        setIsLoading(pollFlag.current);
    },[device]);

    useEffect(()=>{setStatus("");},[selectedDevice]);

    
    const  poll =  async ()=>{
        pollFlag.current=true;
        const response = await  ManualPoll.pollDevice(device.id);
        setIsLoading(true);
        setStatus("Идет опрос");
        const task_id = response.data.task_id;
        // setTimeout(()=>{
        //     dispatch(getDevice(device.id)).then(res=>onUpdate(res.payload));
        // },10000);
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(device.id,task_id);
            if  (response.data.result!==null) {
                response.data.result === true ? setStatus("Опрос завершен успешно") : setStatus("Произошла ошибка при опросе");
                pollFlag.current=false;
                setIsLoading(false);
                dispatch(getDevice(device.id)).then(res=>onUpdate(res.payload));
                clearInterval(timer_ref.current);
            }
            console.log(response.data);
        },5000);

    };
    return (
        <div className={cls.container}>
            <AppButon theme={AppButtonTheme.PRIMARY} onClick={poll} className={classNames(cls.ManualHeatPoll,{},[className])}>
                {"Опросить прибор"}
            </AppButon>
            <div className={cls.loadbox}>
                {loading && <Loader/>}
                {status}
            </div>
        </div>

    );
}