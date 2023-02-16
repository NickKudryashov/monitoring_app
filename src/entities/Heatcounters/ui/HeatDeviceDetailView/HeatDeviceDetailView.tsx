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
            {device.systems.map(element=>
                <div key={element.id}>
                    {element.name}
                    <div className = {cls.parameterTable}>
                        {element.parameters.map(parameter=>
                            <div className={cls.parameterRow} key={parameter.id}>
                                <i>{parameter.name}</i>
                                <div className={cls.valueWithDimension}>
                                    <i className={cls.parameterVal}>{parameter.value}</i>
                                    <i>{parameter.dimension}</i>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}