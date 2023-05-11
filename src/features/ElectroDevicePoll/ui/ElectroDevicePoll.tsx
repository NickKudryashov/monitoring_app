import { memo, useEffect, useRef, useState } from "react";
import classNames  from "shared/lib/classNames/classNames";
import cls from "./ElectroDevicePoll.module.scss";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { electroDeviceActions, fetchElectroDevices } from "entities/ElectroDevice";
import { ElectroNodeData, fetchElectroNodeById } from "entities/ElectroNodes";
import { ManualPoll } from "../service/Polling";
import { Loader } from "shared/ui/Loader/Loader";

export interface ElectroDevicePollProps {
    className?: string;
    device?:TopLevelElectroDevice;
    node?:ElectroNodeData;
    onUpdate:(device:any)=>void;
    nodePolling?:boolean;
    bulk?:boolean;
}

const ElectroDevicePoll = memo((props:ElectroDevicePollProps) => {
    const { className,device,onUpdate,nodePolling=false,bulk=false,node } = props;
    const dispatch = useAppDispatch();
    // const selectedDeviceID = useSelector((state:StateSchema)=>state.electroDevices.selectedDevice.id);
    const selectedDeviceID = device===undefined ? node.id : device.id;
    const {selectedNode} = useSelector((state:StateSchema)=>state.electroNodes);
    const {selectedDevice} = useSelector((state:StateSchema)=>state.electroDevices);
    const {topLevelDevices} = useSelector((state:StateSchema)=>state.electroDevices.data);
    const timer_ref = useRef<ReturnType <typeof setInterval>>();
    const pollFlag = useRef<boolean>();
    if (selectedDevice){
        pollFlag.current=selectedDevice?.is_busy ?? device?.is_busy ?? false;
    }
    const [loading,setIsLoading] = useState(pollFlag.current);
    const [status,setStatus] = useState<string>("");


    useEffect(()=>{
        dispatch(fetchElectroDevices());
        // setIsLoading(selectedDevice?.is_busy ?? device?.is_busy );
    },[pollFlag.current]);

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
        if (device!==undefined){
            dispatch(electroDeviceActions.setBusy(device.id));
            response = await  ManualPoll.pollDevice(selectedDeviceID);
            console.log(device);
        }
        else {
            response = await  ManualPoll.bulkPollDevice(selectedDeviceID);
            topLevelDevices.forEach((topdev)=>dispatch(electroDeviceActions.setBusy(topdev.id)));
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
                response = await ManualPoll.getTaskStatusBulk(selectedDeviceID,task_id);
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
                    topLevelDevices.forEach((topdev)=>dispatch(electroDeviceActions.unsetBusy(topdev.id)));
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
                }
                else {
                    // data.topLevelDevices.forEach((topdev)=>dispatch(electroDeviceActions.unsetBusy(topdev.id)));
                    dispatch(fetchElectroDevices()); 
                }
                if (bulk) {
                    dispatch(fetchElectroNodeById(selectedDeviceID))
                        .then(res=>{onUpdate(res.payload);console.log("Обновлен прибор по ноде",res.payload);});
                    const {data} = await ManualPoll.getBusyStatus(selectedNode.id);
                    if (!data.busy) {
                        clearInterval(timer_ref.current);
                        pollFlag.current=false;
                        setIsLoading(false);
                    }
                }
                
                else {
                    dispatch(fetchElectroDevices())
                        .then(res=>{onUpdate(res.payload);console.log("Обновлен прибор",res.payload);});
                    clearInterval(timer_ref.current);
                    
                }
                    
            }
        },2000);

    };
    return (
        <div className={cls.container}>
            <AppButon theme={AppButtonTheme.SHADOW} onClick={poll} disabled={loading} className={classNames(cls.ManualHeatPoll,{},[className,cls.btn])}>
                {!bulk ? "Опросить прибор" : "Опросить узел"}
            </AppButon>
            <div className={cls.loadbox}>
                {loading && <Loader/>}
                {status}
            </div>
            <br/>
        </div>
    );
});

export  {ElectroDevicePoll};