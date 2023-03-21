import classNames from "shared/lib/classNames/classNames";
import cls from "./ManualBulkHeatPoll.module.scss";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ManualPoll } from "../service/manualPollSerivce";
import { getDevice, getDevices, HeatDevice } from "entities/Heatcounters";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { PayloadAction } from "@reduxjs/toolkit";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

interface ManualBulkHeatPolllProps {
 className?: string;
 node_id:number;
 onUpdate:(node:any)=>void;
}

export function ManualBulkHeatPolll(props: PropsWithChildren<ManualBulkHeatPolllProps>) {
    const { className,node_id,onUpdate } = props;
    const dispatch = useAppDispatch();
    const {devices,selectedDevice} = useAppSelector(state=>state.heatDeviceReducer);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    const dev_ids = devices.map((dev=> {if (dev.node===node_id) {return dev.id;}}));
    useEffect(()=>{
        setIsLoading(pollFlag.current);
    },[node_id]);

    useEffect(()=>{setStatus("");},[selectedDevice]);

    
    const  poll =  async ()=>{
        pollFlag.current=true;
        const response = await  ManualPoll.bulkPollDevice(dev_ids);
        setIsLoading(true);
        setStatus("Идет опрос");
        const task_id = response.data.task_id;
        // setTimeout(()=>{
        //     dispatch(getDevice(device.id)).then(res=>onUpdate(res.payload));
        // },10000);
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(0,task_id);
            if  (response.data.result!==null) {
                response.data.result === true ? setStatus("Опрос завершен успешно") : setStatus("Произошла ошибка при опросе");
                pollFlag.current=false;
                setIsLoading(false);
                // dispatch(getDevices()).then(res=>onUpdate(res.payload));
                dispatch(getDevices());
                clearInterval(timer_ref.current);
            }
            console.log(response.data);
        },2000);

    };
    return (
        <div className={cls.container}>
            <AppButon theme={AppButtonTheme.OUTLINE} onClick={poll} className={classNames(cls.ManualBulkHeatPolll,{},[className,cls.btn])}>
                {"Опросить узел"}
            </AppButon>
            <div className={cls.loadbox}>
                {loading && <Loader/>}
                {status}
            </div>
            <br/>
        </div>

    );
}