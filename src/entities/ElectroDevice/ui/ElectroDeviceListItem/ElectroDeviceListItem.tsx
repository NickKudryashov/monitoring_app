import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ElectroDeviceListItem.module.scss";

import type { PropsWithChildren } from "react";
import { CANMapper, TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface ElectroDeviceListItemProps {
 className?: string;
 objectID:number;
 onDeviceClick: (device:TopLevelElectroDevice)=>void;
}

export const ElectroDeviceListItem = memo((props: PropsWithChildren<ElectroDeviceListItemProps>) => {
    const { className,objectID,onDeviceClick } = props;
    const {data,selectedDevice} = useSelector((state:StateSchema)=>state.electroDevices);
    return (
        <div className={classNames(cls.ListItem,{},[className])}>
            {
                data!==undefined && data.topLevelDevices.map((device)=>device.user_object===objectID && 
                <div key={device.id} className={cls.deviceLabels}>
                    { 
                        selectedDevice && selectedDevice.id===device.id  ?
                            <div className={cls.selected} onClick={()=>{onDeviceClick(device);}}>
                                {`${device.name} №${device.device_num}`}
                            </div>:
                            <div  onClick={()=>{onDeviceClick(device);}}>
                                {`${device.name} №${device.device_num}`}
                            </div>

                    }
                </div>
                )}
        </div>
    );
});