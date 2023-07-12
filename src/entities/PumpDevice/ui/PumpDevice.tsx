import { memo, useEffect, useState } from "react";
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

interface ExpandedDict {
    [Key : string]:boolean;
}

export interface PumpDeviceProps {
 className?: string;
 id:number;
}
 
export const PumpDevice = memo((props:PumpDeviceProps) => {
    const { className,id=1 } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector((state:StateSchema)=>state.pumpDevices.isLoading);
    const [expanded,setExpanded] = useState<string[]>([]);
    const device = useSelector((state:StateSchema)=>state.pumpDevices.data).filter(el=>el?.id===id)[0];
    const task_id = useSelector((state:StateSchema)=>state.pumpDevices.task_id);
    const orderedParams = createParameterGroups(device?.parameters ?? []);
    


    useEffect(()=>{
        dispatch(fetchPumpDevice());
    },[dispatch]);

    if (isLoading) {
        const poller = setInterval(async ()=>{
            const response = await $api.put<boolean | null>("pump/poll/"+id,{task_id:task_id});
            if (response.data !== null) {
                clearInterval(poller);
                dispatch(pumpDeviceActions.setIsLoading(false));
                dispatch(fetchPumpDevice());
                alert("завершено");
            }
        },2000);
    }
    return (
        <div className={classNames(cls.pumpDevice, {}, [className])}>
            <div>
                {device && 
                <div>
                    <b className={cls.title}>{"Информация по прибору "+device.device_type_verbose_name+" "+device.name}</b>
                    <p>{`Дата/Время последнего опроса ${device?.last_update ?? "не опрашивался"}`}</p>
                    <br/>
                    <br/>
                </div>
                }

                {
                    Object.values(orderedParams) &&
                    GROUP_ORDER.map((el)=>(
                        orderedParams[el] && 
                        <div className={cls.groupBox} key={el}>
                            <b onClick={(e)=>{
                                expanded.includes(el) ? setExpanded(prev=>prev.filter((gr)=>gr!==el)) : setExpanded(prev=>([...prev,el]));
                                console.log(expanded);
                            }}>{VERBOSE[el]}</b>
                            { expanded.includes(el) && 
                            <div className={cls.group_parameter} key={el}>
                                {orderedParams[el]?.map(par=>
                                    <p key={par.id}>
                                        {par.verbose_name + "  " + par.value}
                                    </p>)}
                            </div>}
                            <br/>
                        </div>
                    ))
                }
            </div>
            <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>{dispatch(pollPumpDevice(device.id));}} >Опросить</AppButon>
        </div>
    );
});
