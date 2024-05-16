import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./PumpDevListItem.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { PumpDeviceData } from "entities/PumpDevice/model/types/pumpDevice";

interface PumpDevListItemProps {
 className?: string;
 objectID:number;
 catID:number;
 onDeviceClick: (device:PumpDeviceData)=>void;

}

export const PumpDevListItem = memo((props: PropsWithChildren<PumpDevListItemProps>) => {
    const { className,objectID,onDeviceClick,catID } = props;
    const devlist = useSelector((state:StateSchema)=>state.pumpDevices.data);
    return (
        <div className={classNames(cls.ListItem,{},[className])}>

        </div>
    );
});
