import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceListItem.module.scss";

import type { PropsWithChildren } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface ListItemProps {
 className?: string;
 objectID:number;
 onDeviceClick: (device:HeatDevice)=>void;
}

export function HeatDeviceListItem(props: PropsWithChildren<ListItemProps>) {
    const { className,objectID,onDeviceClick } = props;
    const {entities,selectedDeviceID} = useSelector((state:StateSchema)=>state.heatDevices);
    return (
        <div className={classNames(cls.ListItem,{},[className])}>
            {Object.values(entities).map((device)=>device.user_object===objectID && 
            <div key={device.id} className={cls.deviceLabels}>
                { selectedDeviceID && selectedDeviceID===device.id ?
                    <div className={cls.selected} onClick={()=>{onDeviceClick(device);}}>{`${device.name} №${device.device_num}`}</div>
                    :
                    <div  onClick={()=>{onDeviceClick(device);}}>{`${device.name} №${device.device_num}`}</div>

                }
            </div>
            )}
        </div>
    );
}