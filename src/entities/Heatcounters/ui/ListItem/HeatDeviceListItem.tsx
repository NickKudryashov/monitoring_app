import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceListItem.module.scss";

import type { PropsWithChildren } from "react";
import {  useAppSelector } from "shared/hooks/hooks";
import { HeatDevice } from "entities/Heatcounters/types/type";

interface ListItemProps {
 className?: string;
 objectID:number;
 onDeviceClick: (device:HeatDevice)=>void;
}

export function HeatDeviceListItem(props: PropsWithChildren<ListItemProps>) {
    const { className,objectID,onDeviceClick } = props;
    const {devices,selectedDevice} = useAppSelector(state=>state.heatDeviceReducer);
    return (
        <div className={classNames(cls.ListItem,{},[className])}>
            {devices.map((device)=>device.user_object===objectID && 
            <div key={device.id} className={cls.deviceLabels}>
                { selectedDevice && selectedDevice.id===device.id ?
                    <div className={cls.selected} onClick={()=>{onDeviceClick(device);}}>{`${device.name} №${device.device_num}`}</div>
                    :
                    <div  onClick={()=>{onDeviceClick(device);}}>{`${device.name} №${device.device_num}`}</div>

                }
            </div>
            )}
        </div>
    );
}