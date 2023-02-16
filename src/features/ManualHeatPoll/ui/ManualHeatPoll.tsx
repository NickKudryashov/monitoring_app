import classNames from "shared/lib/classNames/classNames";
import cls from "./ManualHeatPoll.module.scss";

import type { PropsWithChildren } from "react";
import { ManualPoll } from "../service/manualPollSerivce";
import { getDevice, getDevices, HeatDevice } from "entities/Heatcounters";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";

interface ManualHeatPollProps {
 className?: string;
 device:HeatDevice;
 onUpdate:(device:HeatDevice)=>void;
}

export function ManualHeatPoll(props: PropsWithChildren<ManualHeatPollProps>) {
    const { className,device,onUpdate } = props;
    const dispatch = useAppDispatch();
    const {devices} = useAppSelector(state=>state.heatDeviceReducer);
    const  poll =  async ()=>{
        const response = await  ManualPoll.pollDevice(device.id);
        setTimeout(()=>{dispatch(getDevices());devices.map(dev=>dev.id===device.id && onUpdate(dev));},10000);

    };
    return (
        <div>
            <button onClick={()=>console.log(devices)}>Написать состояние</button>
            <button onClick={poll} className={classNames(cls.ManualHeatPoll,{},[className])}>
                {"Опросить прибор"}
            </button>
        </div>

    );
}