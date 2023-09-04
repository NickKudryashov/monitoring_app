import { memo, useEffect, useRef, useState } from "react";
import classNames  from "shared/lib/classNames/classNames";
import cls from "./ElectroDevicePoll.module.scss";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { electroDeviceActions, fetchElectroDevices } from "entities/ElectroDevice";
import { ManualPoll } from "../service/Polling";
import { Modal } from "shared/ui/Modal/Modal";

export interface ElectroDevicePollProps {
    className?: string;
    device?:TopLevelElectroDevice;
    onUpdate:()=>void;
    catID?:number;
    bulk?:boolean;
}

const ElectroDevicePoll = memo((props:ElectroDevicePollProps) => {
    const { className,device,onUpdate,catID,bulk=false } = props;
    const dispatch = useAppDispatch();
    // const selectedDeviceID = useSelector((state:StateSchema)=>state.electroDevices.selectedDevice.id);
    const selectedDeviceID =  device?.id;
    const {selectedDevice} = useSelector((state:StateSchema)=>state.electroDevices);
    const {data} = useSelector((state:StateSchema)=>state.electroDevices);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    if (selectedDevice){
        pollFlag.current=selectedDevice?.is_busy ?? device?.is_busy ?? false;
    }
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
        if (!pollFlag.current){
            poll();
        }
        return ()=>{
            pollFlag.current = false;
            setEvents([]);
            if (timer_ref.current) {
                clearInterval(timer_ref.current);
            }
        };
        // setIsLoading(selectedDevice?.is_busy ?? device?.is_busy );
    },[dispatch,device.id]);

    useEffect(()=>{
        setIsLoading(selectedDevice?.is_busy ?? device?.is_busy );
    },[device?.is_busy, selectedDevice]);

    useEffect(()=>{setStatus("");},[selectedDeviceID]);

    const  poll =  async ()=>{
        if (loading){
            return;
        }
        pollFlag.current=true;
        let response;
        if (device!==undefined && !bulk){
            dispatch(electroDeviceActions.setBusy(device.id));
            response = await  ManualPoll.pollDevice(selectedDeviceID);
            console.log(device);
        }
        else {
            response = await  ManualPoll.bulkPollDevice(catID);
            data?.topLevelDevices.forEach((topdev)=>dispatch(electroDeviceActions.setBusy(topdev.id)));
        }
        setIsLoading(true);
        setStatus("Идет опрос");
        const task_id = response?.data?.task_id ?? undefined;
        
        // setTimeout(()=>{
        //     dispatch(getDevice(device.id)).then(res=>onUpdate(res.payload));
        // },10000);
        timer_ref.current = setInterval(async ()=>{
            let response;
            if (device) {
                response = await ManualPoll.getTaskStatus(selectedDeviceID,task_id);
            }
            else {
                response = await ManualPoll.getTaskStatusBulk(catID,task_id);
                // dispatch(fetchElectroDevices());
            }
            if (response.status===500) {
                setIsLoading(false);
                if (device){
                    dispatch(electroDeviceActions.unsetBusy(device.id));
                    dispatch(fetchElectroDevices());
                }
                else {
                    console.log("UNSET!!!!!");
                    data?.topLevelDevices.forEach((topdev)=>dispatch(electroDeviceActions.unsetBusy(topdev.id)));
                }
                setStatus("Произошла ошибка при опросе");
                pollFlag.current=false;
                clearInterval(timer_ref.current);
                return;
            }
            if  (response.data?.result!==null) {
                response.data.result === true ? setStatus("Опрос завершен успешно") : setStatus("Произошла ошибка при опросе");
                if (device){
                    dispatch(fetchElectroDevices());
                    dispatch(electroDeviceActions.unsetBusy(device.id));
                    clearInterval(timer_ref.current);
                }
                else {
                    data?.topLevelDevices.forEach((topdev)=>dispatch(electroDeviceActions.unsetBusy(topdev.id)));                
                    dispatch(fetchElectroDevices())
                        .then(res=>onUpdate());
                    clearInterval(timer_ref.current);
                }
                    
            }
            else {
                setEvents(response.data.events);
                setIsLoading(true);
            }
        },2000);

    };
    return (
        <div className={cls.container}>
            {device && !device.autopoll && <AppButon theme={AppButtonTheme.SHADOW} onClick={poll} disabled={loading} className={classNames(cls.ManualHeatPoll,{},[className,cls.btn])}>
                {loading? "Идет опрос.." : !bulk ? "Опросить прибор" : "Опросить узел"}
            </AppButon>}
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
});

export  {ElectroDevicePoll};