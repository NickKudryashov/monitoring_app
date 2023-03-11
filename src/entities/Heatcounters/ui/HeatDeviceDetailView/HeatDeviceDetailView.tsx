import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceDetailView.module.scss";

import type { PropsWithChildren } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";
import { timeConvert } from "entities/Heatcounters/lib/timeConvert";

interface DetailViewProps {
 className?: string;
 device:HeatDevice;
}

export function HeatDeviceDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,device,children } = props;

    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <b>Информация по прибору {device.name}</b>
            {`Дата последнего опроса: ${timeConvert(device.last_update)}`}
            {children}
            <div className={cls.systemsRow}>
                {device.systems.map(element=>
                    <div className={cls.systemBox} key={element.id}>
                        <b>{`ТС${element.index+1}  ${element.name}`}</b>
                        <div className = {cls.parameterTable}>
                            {element.parameters.map(parameter=>
                                <div className={cls.parameterRow} key={parameter.id}>
                                    <div>
                                        <b>{parameter.name.split(",")[0]}</b>
                                        {parameter.name.split(",")[1]!==undefined && `,${parameter.name.split(",")[1]}`}
                                    </div>
                                    <div className={cls.valueWithDimension}>
                                        <div className={cls.parameterVal}>{parameter.value}</div>
                                        <div>{parameter.dimension}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}