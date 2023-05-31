import classNames from "shared/lib/classNames/classNames";
import cls from "./ManualHeatPoll.module.scss";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ManualPoll } from "../service/manualPollSerivce";
import { getDevice, getDeviceById, getDevices, HeatDevice } from "entities/Heatcounters";
import { useAppDispatch } from "shared/hooks/hooks";
import { PayloadAction } from "@reduxjs/toolkit";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { heatNodeRequest } from "entities/HeatNodes";
import { useSelector } from "react-redux";
import {StateSchema} from "app/providers/StoreProvider/config/stateSchema";
interface ManualHeatPollProps {
 className?: string;
 device:HeatDevice;
 onUpdate:(device:any)=>void;
 nodePolling?:boolean;
}

export function ManualHeatPoll(props: PropsWithChildren<ManualHeatPollProps>) {
    const { className,device,onUpdate,nodePolling=false } = props;
    const dispatch = useAppDispatch();
    const selectedDeviceID = useSelector((state:StateSchema)=>state.heatDevices.selectedDeviceID);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    
    useEffect(()=>{
        setIsLoading(pollFlag.current);
    },[device]);

    useEffect(()=>{setStatus("");},[selectedDeviceID]);

    
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
                
                if (nodePolling) {
                    dispatch(getDevice(device.id));
                    dispatch(heatNodeRequest(device.node))
                        .then(res=>{onUpdate(res.payload);console.log("Обновлен прибор по ноде",res.payload);}); }
                else {
                    dispatch(getDevice(device.id))
                        .then(res=>{onUpdate(res.payload);console.log("Обновлен прибор",res.payload);});
                }
                    
                clearInterval(timer_ref.current);
            }
            console.log(response.data);
        },2000);

    };
    return (
        <div className={classNames(className,{},[cls.container])}>
            <AppButon theme={AppButtonTheme.SHADOW} onClick={poll} className={classNames(cls.ManualHeatPoll,{},[className,cls.btn])}>
                {"Опросить прибор"}
            </AppButon>
            <div className={cls.loadbox}>
                {loading && <Loader/>}
                {status}
            </div>
            <br/>
        </div>

    );
}