import { memo, useEffect, useRef, useState } from "react";
import cls from "./PumpDevice.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/hooks/hooks";
import { checkPollPumpDevice, fetchPumpDevice, pollPumpDevice } from "../model/services/fetchPumpDevice/fetchPumpDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import $api from "shared/api";
import { pumpDeviceActions } from "../model/slice/pumpDevice";
import { createParameterGroups } from "../model/helpers/sortParametersByGroup";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { useInfinityScroll } from "shared/hooks/useInfinityScroll";
import { PumpPollResponse } from "../model/types/pumpDevice";
import { Modal } from "shared/ui/Modal/Modal";
import { getPumpData } from "../api/pumpApi";

const GROUP_ORDER = [
    "general_group",
    "pump_1_group",
    "pump_2_group",
    "pump_3_group",
    "pump_4_group",
    "pump_5_group",
    "pump_6_group"
];
const GENERAL = "general_group";
const PUMP_1 = "pump_1_group";
const PUMP_2 = "pump_2_group";
const PUMP_3 = "pump_3_group";
const PUMP_4 = "pump_4_group";
const PUMP_5 = "pump_5_group";
const PUMP_6 = "pump_6_group";

const VERBOSE:Record<string,string> = {
    "general_group" : "Общие параметры",
    "pump_1_group" : "Параметры насоса №1",
    "pump_2_group" : "Параметры насоса №2",
    "pump_3_group" : "Параметры насоса №3",
    "pump_4_group" : "Параметры насоса №4",
    "pump_5_group" : "Параметры насоса №5",
    "pump_6_group" : "Параметры насоса №6",
};

const VIEW_1= "system_general_error";
const VIEW_2 =  "system_ready_auto_mode";
const VIEW_3=   "out_pressure";

interface ExpandedDict {
    [Key : string]:boolean;
}

export interface PumpDeviceProps {
 className?: string;
 id:number;
}
 
export const PumpDevice = memo((props:PumpDeviceProps) => {
    const { className,id } = props;
    const dispatch = useAppDispatch();
    const [expanded,setExpanded] = useState<string[]>([]);
    const {isLoading:isDevLoading,data:device,refetch} = getPumpData(String(id));
    const {task_id,isLoading} = useSelector((state:StateSchema)=>state.pumpDevices);
    const orderedParams = createParameterGroups(device?.parameters ?? []);
    const wr = useRef<HTMLDivElement | null>();
    const tr = useRef<HTMLDivElement | null>();
    const [pollInterval,setPollInterval] = useState(device?.interval);
    const [autoPollMode,setAutoPollmode] = useState(device?.autopoll);
    // const callback = ()=>{
    //     console.log("callbackkkkk");
    // };
    // useInfinityScroll({callback,wrapperRef:wr,triggerRef:tr});

    useEffect(()=>{
        if (!isDevLoading) {
            setPollInterval(device.interval);
            setAutoPollmode(device.autopoll);
        }
    },[isDevLoading]);

    useEffect(()=>{
        dispatch(pollPumpDevice(device?.id));
        const interval = setInterval(()=>dispatch(pollPumpDevice(device?.id)),60000);
        return ()=>{
            if (interval) {
                clearInterval(interval);
            }
        };
    },[device?.id, dispatch, id]);

    const editAutoPoll = async ()=>{
        const response = await $api.post("pump/"+device.id+"/edit",{autopoll_flag:autoPollMode,interval_minutes:Number(pollInterval)});
        refetch();
    };

    if (isLoading) {
        const poller = setInterval(async ()=>{
            const response = await $api.put<PumpPollResponse>("pump/poll/"+id,{task_id:task_id});
            if (response.data !== null) {
                clearInterval(poller);
                dispatch(pumpDeviceActions.setIsLoading(false));
                refetch();
            }
        },2000);
    }
    return (
        <div ref={wr} className={classNames(cls.pumpDevice, {}, [className])}>
            <div>
                {device && 
                <div>
                    <b className={cls.title}>{"Информация по прибору "+device.device_type_verbose_name+" "+device.name}</b>
                    <p>{`Дата/Время последнего опроса ${device?.last_update ?? "не опрашивался"}`}</p>
                    <br/>
                    <br/>
                </div>
                }
                <div className={cls.autoFlagBox}>
                    <input  type='checkbox' checked={autoPollMode} onChange={()=>setAutoPollmode(prev=>!prev)} id={"device_autopoll"} />
                    <label htmlFor={"device_autopoll"}>Включить автоопрос</label>
                </div>
                <p>Интвервал автоопроса в минутах:</p>
                <input value={String(pollInterval)} onChange={(e)=>setPollInterval(Number(e.target.value))} />
                <AppButon theme={AppButtonTheme.SHADOW} onClick={editAutoPoll}>Применить изменения</AppButon>
                {
                    device?.parameters?.length>0 && 
                    device?.parameters?.map((param)=> (param.tag===VIEW_1 || param.tag===VIEW_2 || param.tag===VIEW_3) && 
                        <div className={cls.groupBox} key={param.id}>
                            <p key={param.id}>
                                {param.verbose_name + "  " + param.value}
                            </p>
                        </div>
                    )
                }
                {
                    Object.values(orderedParams) &&
                    GROUP_ORDER.map((el)=>(
                        orderedParams[el] && 
                        <div className={cls.groupBox} key={el}>
                            <b onClick={(e)=>{
                                expanded.includes(el) ? setExpanded(prev=>prev.filter((gr)=>gr!==el)) : setExpanded(prev=>([...prev,el]));
                            }}>{VERBOSE[el]}</b>
                            { expanded.includes(el) && 
                            <div className={cls.group_parameter} key={el}>
                                {orderedParams[el]?.map(par=>
                                    <p key={par.id}>
                                        {par.verbose_name + "  " + par.value}
                                    </p>)}
                                {orderedParams[el]?.map(par=>
                                    <p key={par.id}>
                                        {par.verbose_name + "  " + par.value}
                                    </p>)}
                            </div>}
                            <br/>
                        </div>
                    ))
                }
                <p>Параметры с суффиксом * доступны только для приборов SK-712/d,/sd/w</p>
                <p>Параметры с суффиксом * доступны только для приборов SK-712/w</p>
            </div>
            <div ref={tr}/>
            {device && !device.autopoll && <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>{dispatch(pollPumpDevice(device.id));}} >Опросить</AppButon>}
        </div>
    );
});
