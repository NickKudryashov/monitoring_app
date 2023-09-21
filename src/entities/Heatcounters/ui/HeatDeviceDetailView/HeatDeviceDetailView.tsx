import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceDetailView.module.scss";

import { PropsWithChildren, useEffect, useState } from "react";
import { HeatDevice } from "entities/Heatcounters/types/type";
import { timeConvert } from "shared/lib/helpers/datetimeConvert";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import HeatDeviceService from "entities/Heatcounters/service/HeatDeviceService";
import { useDebounce } from "shared/hooks/useDebounce";
import { useAppDispatch } from "shared/hooks/hooks";
import { HeatActions } from "entities/Heatcounters/reducers/reducer";
import { getDevice } from "entities/Heatcounters/reducers/actionCreator";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { getHeatDeviceData } from "entities/Heatcounters/api/heatcountersapi";
import { Loader } from "shared/ui/Loader/Loader";
import { HeatPoll } from "../HeatPoll/HeatPoll";

interface DetailViewProps {
 className?: string;
 id:string;
}

export function HeatDeviceDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,children,id } = props;
    const [currentConturs,setCurrentConturs] = useState<string[]>([]);
    const {isLoading,data:device,refetch} = getHeatDeviceData(id);
    const [pollInterval,setPollInterval] = useState(device?.interval);
    const [autoPollMode,setAutoPollmode] = useState(device?.autopoll);
    const dispatch = useAppDispatch();
    const conturChangeHandler = (conturName:string)=>{
        setCurrentConturs((prev)=>{
            if (prev.includes(conturName)) {
                return prev.filter((el)=>el!==conturName);
            }
            return [...prev,conturName];
        });
    };

    useEffect(()=>{
        if (!isLoading){
            setPollInterval(device?.interval);
            setAutoPollmode(device?.autopoll);
    
        }
    },[device?.autopoll, device?.interval, isLoading]);
    
    useEffect(()=>{
        return ()=>{
            setPollInterval(device?.interval);
            setAutoPollmode(device?.autopoll);
        };
    },[id]);
    const editAutoPoll = async ()=>{
        const response = await HeatDeviceService.editHeatAutoSettings(device.id,Number(pollInterval),autoPollMode);
        refetch();

    };



    const renameParameter = async (id:number,comment:string)=> {
        const response = await HeatDeviceService.renameParameter(id,comment);
        refetch();
    };
    const debouncedRename = useDebounce(renameParameter,1500);

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    // console.log("детейл счетчик рендерится");
    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <div className={cls.content}>
                <div className={cls.generalInfo}>
                    <b className={cls.deviceTitle}>Информация по прибору {`${device.name} ${device.device_type_verbose_name} №${device.device_num} `}</b>
                    <p className={cls.dateRow}>{`Дата последнего опроса: ${timeConvert(device.last_update)}`}</p>
                    <HeatPoll autoPoll={device.autopoll} id={device.id} onUpdate={refetch} />
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
                <div className={cls.autoFlagBox}>
                    <input  type='checkbox' checked={autoPollMode} onChange={()=>setAutoPollmode(prev=>!prev)} id={"device_autopoll"} />
                    <label htmlFor={"device_autopoll"}>Включить автоопрос</label>
                </div>
                <p>Интвервал автоопроса в минутах:</p>
                <input value={String(pollInterval)} onChange={(e)=>setPollInterval(Number(e.target.value))} />
                <AppButon theme={AppButtonTheme.SHADOW} onClick={editAutoPoll}>Применить изменения</AppButon>
                {children}
            </div>
        </div>
    );
}