import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceDetailView.module.scss";

import { PropsWithChildren, useState } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";
import { timeConvert } from "shared/lib/helpers/datetimeConvert";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import HeatDeviceService from "entities/Heatcounters/service/HeatDeviceService";
import { useDebounce } from "shared/hooks/useDebounce";
import { useAppDispatch } from "shared/hooks/hooks";
import { HeatActions } from "entities/Heatcounters/reducers/reducer";

interface DetailViewProps {
 className?: string;
 device:HeatDevice;
}

export function HeatDeviceDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,device,children } = props;
    const [currentConturs,setCurrentConturs] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const conturChangeHandler = (conturName:string)=>{
        setCurrentConturs((prev)=>{
            if (prev.includes(conturName)) {
                return prev.filter((el)=>el!==conturName);
            }
            return [...prev,conturName];
        });
    };

    const renameParameter = async (id:number,comment:string)=> {
        const response = await HeatDeviceService.renameParameter(id,comment);
    };
    const debouncedRename = useDebounce(renameParameter,1500);


    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <div className={cls.content}>
                <div className={cls.generalInfo}>
                    <b className={cls.deviceTitle}>Информация по прибору {`${device.name} ${device.device_type_verbose_name} №${device.device_num} `}</b>
                    <p className={cls.dateRow}>{`Дата последнего опроса: ${timeConvert(device.last_update)}`}</p>
                
                </div>
                <div className={cls.systemsRow}>
                    <br/>
                    {device.systems.map(element=>
                        <div className={cls.systemBox} key={element.id}>
                            <b className={cls.deviceTitle} onClick={()=>conturChangeHandler(element.name)}>{`ТС${element.index+1}  ${element.name} ${element.schema ?`Схема:${element.schema}` :""} ${element.formula ?`Формула:${element.formula}` :""} `}</b>
                            {   currentConturs.includes(element.name) && 
                            <div className = {cls.parameterTable}>
                                <br/>
                                {element.parameters.map(parameter=>
                                    <div className={cls.parameterRow} key={parameter.id}>
                                        <div className={cls.parameterName}>
                                            <b>{parameter.name.split(",")[0]}</b>
                                            {parameter.name.split(",")[1]!==undefined && `,${parameter.name.split(",")[1]}`}
                                        </div>
                                        <div className={cls.valueWithDimension}>
                                            <div className={cls.parameterVal}>{parameter.value}</div>
                                            <div>{parameter.dimension}</div>
                                            <AppInput className={cls.parameterComment} onChange={(e)=>{dispatch(HeatActions.renameParameterAction({dev_id:device.id,system_id:element.id,parameter_id:parameter.id,comment:e.target.value}));debouncedRename(parameter.id,e.target.value);}} placeholder={parameter?.comment ? parameter.comment : "Примечание"} value={parameter?.comment} theme={InputThemes.CLEAR} />

                                        </div>

                                    </div>
                                )}
                            </div>
                            }

                        </div>
                    )}
                </div>
            </div>
            <div className={cls.featureBox}>
                {children}
            </div>
        </div>
    );
}