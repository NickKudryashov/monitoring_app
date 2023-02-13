import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceDetailView.module.scss";

import type { PropsWithChildren } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";

interface DetailViewProps {
 className?: string;
 device:HeatDevice;
}

export function HeatDeviceDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,device,children } = props;

    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <b>Информация по прибору {device.name}</b>
            {children}
        </div>
    );
}