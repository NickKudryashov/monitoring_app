import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceListItem.module.scss";

import type { PropsWithChildren } from "react";
import {  useAppSelector } from "shared/hooks/hooks";

interface ListItemProps {
 className?: string;
 objectID:number;
}

export function HeatDeviceListItem(props: PropsWithChildren<ListItemProps>) {
    const { className,objectID } = props;
    const {devices} = useAppSelector(state=>state.heatDeviceReducer);
    return (
        <div className={classNames(cls.ListItem,{},[className])}>
            {devices.map(({name,device_num,id,user_object})=>user_object===objectID && 
            <div key={id} className={cls.deviceLabels}>
                <i>{`${name} №${device_num}`}</i>
            </div>
            )}
        </div>
    );
}