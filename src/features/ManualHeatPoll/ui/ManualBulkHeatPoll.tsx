import classNames from "shared/lib/classNames/classNames";
import cls from "./ManualBulkHeatPoll.module.scss";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ManualPoll } from "../service/manualPollSerivce";
import { getDevice, getDevices, HeatDevice, refreshDevices } from "entities/Heatcounters";
import { useAppDispatch } from "shared/hooks/hooks";
import { PayloadAction } from "@reduxjs/toolkit";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { heatNodeRequest } from "entities/HeatNodes";

interface ManualBulkHeatPolllProps {
 className?: string;
 node_id:number;
 onUpdate:(node:any)=>void;
}

export function ManualBulkHeatPolll(props: PropsWithChildren<ManualBulkHeatPolllProps>) {
    const { className,node_id,onUpdate } = props;
    const dispatch = useAppDispatch();
    const {entities,selectedDeviceID} = useSelector((state:StateSchema)=>state.heatDevices);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    const dev_ids = Object.values(entities).map((dev=> {if (dev.node===node_id) {return dev.id;}}));
    useEffect(()=>{
        setIsLoading(pollFlag.current);
    },[node_id]);

    useEffect(()=>{setStatus("");},[selectedDeviceID]);

    
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
                dispatch(refreshDevices());
                dispatch(heatNodeRequest(node_id))
                    .then(res=>{onUpdate(res.payload);console.log("Обновлен прибор по ноде",res.payload);}); 
                clearInterval(timer_ref.current);
            }
            console.log(response.data);
        },2000);

    };
    return (
        <div className={classNames(className,{},[cls.container,])}>
            <AppButon disabled={loading} theme={AppButtonTheme.SHADOW} onClick={poll} className={classNames(cls.ManualBulkHeatPolll,{},[className,cls.btn])}>
                {loading ? "Идет опрос..." :"Опросить узел"}
            </AppButon>
            <div className={cls.loadbox}>
                {/* {loading && <Loader/>} */}
                {/* {status} */}
            </div>
            <br/>
        </div>

    );
}