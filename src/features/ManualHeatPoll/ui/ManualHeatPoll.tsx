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
    const pollFlag = useRef<boolean>();
    pollFlag.current=false;
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");
    const [events,setEvents] = useState<string[]>();
    const [modalOpen,setModalOpen] = useState(false);
    useEffect(()=>{
        return ()=>{
            if (timer_ref.current){
                clearInterval(timer_ref.current);}
        };
    },[]);
    useEffect(()=>{
        if(!pollFlag.current){
            poll();
        }
        setIsLoading(pollFlag.current);
        return ()=>{
            pollFlag.current=false;
            setEvents([]);
            if (timer_ref.current){
                clearInterval(timer_ref.current);
            }
        };
    },[device.id]);

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
        setTimeout(()=>{
            dispatch(getDevice(device.id));            
        },2000);
        timer_ref.current = setInterval(async ()=>{
            const response = await ManualPoll.getTaskStatus(device.id,task_id);
            if  (response.data.result!==null) {
                setEvents(response.data.events);
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
            console.log(response.data);
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
            <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>setModalOpen(true)}>
                {"Открыть лог прибора"}
            </AppButon>
            <Modal onClose={()=>setModalOpen(false)} isOpen={modalOpen} >
                <div className={cls.logWindow}>
                    {events && events.map((element,i)=>
                        <p key={i}>{element}</p>
                    )}
                </div>
            </Modal>
            <div className={cls.loadbox}>
                {/* {loading && <Loader/>} */}
                {/* {status} */}
            </div>
            <br/>
        </div>

    );
}