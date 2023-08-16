import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceListItem.module.scss";

import type { PropsWithChildren } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

interface ListItemProps {
 className?: string;
 objectID:number;
 catID:number
 onDeviceClick: (device:HeatDevice)=>void;
}

export function HeatDeviceListItem(props: PropsWithChildren<ListItemProps>) {
    const { className,objectID,onDeviceClick,catID } = props;
    const {entities,selectedDeviceID} = useSelector((state:StateSchema)=>state.heatDevices);
    return (
        <div className={classNames(cls.ListItem,{},[className])}>
            {Object.values(entities).map((device)=>device.user_object===objectID && device.subcategory===catID && 
            <div key={device.id} className={cls.deviceLabels}>
                { selectedDeviceID && selectedDeviceID===device.id ?
                    <div className={cls.selected} onClick={()=>{onDeviceClick(device);}}>{`${device.name} №${device.device_num}`}</div>
                    :
                    <AppLink to={RoutePathAuth.heatdevice+device.id}>
                        <div  onClick={()=>{onDeviceClick(device);}}>
                            {`${device.name} №${device.device_num}`}
                    
                        </div>
                    </AppLink>


                }
            </div>
            )}
        </div>
    );
}