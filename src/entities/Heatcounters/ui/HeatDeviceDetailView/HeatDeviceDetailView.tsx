import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceDetailView.module.scss";

import { PropsWithChildren, useState } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";
import { timeConvert } from "shared/lib/helpers/datetimeConvert";

interface DetailViewProps {
 className?: string;
 device:HeatDevice;
}

export function HeatDeviceDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,device,children } = props;
    const [currentConturs,setCurrentConturs] = useState<string[]>([]);

    const conturChangeHandler = (conturName:string)=>{
        setCurrentConturs((prev)=>{
            if (prev.includes(conturName)) {
                return prev.filter((el)=>el!==conturName);
            }
            return [...prev,conturName];
        });
    };

    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <b className={cls.deviceTitle}>Информация по прибору {`${device.name} ${device.device_type_verbose_name} №${device.device_num} `}</b>
            <p className={cls.deviceTitle}>{`Дата последнего опроса: ${timeConvert(device.last_update)}`}</p>
            {children}
            <div className={cls.systemsRow}>
                {device.systems.map(element=>
                    <div className={cls.systemBox} key={element.id}>
                        <b onClick={()=>conturChangeHandler(element.name)}>{`ТС${element.index+1}  ${element.name} ${element.schema ?`Схема:${element.schema}` :""} ${element.formula ?`Формула:${element.formula}` :""} `}</b>
                        {   currentConturs.includes(element.name) && 
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
                        }

                    </div>
                )}
            </div>
        </div>
    );
}