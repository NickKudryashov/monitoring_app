import classNames from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroCounterDetailView.module.scss";

import type { PropsWithChildren } from "react";
import { ElectroCounter, TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { editElectroCounter } from "entities/ElectroDevice/model/services/editCounter/editCounter";
import { useDebounce } from "shared/hooks/useDebounce";

interface ElectroCounterDetailViewProps {
 className?: string;
 device:TopLevelElectroDevice;
 counter:ElectroCounter
}

export const ElectroCounterDetailView = memo((props: PropsWithChildren<ElectroCounterDetailViewProps>) => {
    const { className,device,counter } = props;
    const dispatch = useAppDispatch();
    const [devName,setDevName] = useState(counter.name);
    const editRequest = (devId:number,name:string)=>{
        dispatch(editElectroCounter({devId,name}));
    };
    const debouncedEditHandler = useDebounce(editRequest,2000);

    const editHandler = (name:string,devId:number)=>{
        debouncedEditHandler(devId,name);
        setDevName(name);
    };
    const mods = {
        [cls.deltaError]:(counter.delta_error) && (counter?.parameters?.filter((el)=>el.tag==="A+0" && el.value).length>0)
    };
    return (
        <div>
            {counter.device === device.id && 
            <div className={classNames(cls.counter_line,mods,[])} key={counter.inner_id}>
                <b className={cls.rowElement}>{`${counter.device_type_verbose_name}`}</b>
                <p className={cls.rowElement}>{`ID:${counter.inner_id}`}</p>
                <p className={cls.rowElement}>{`№${counter.device_num ?? " Н/О"}`}</p>
                <input className={classNames(cls.rowElement,mods,[])} value={devName} onChange={(e)=>editHandler(e.target.value,counter.id)}/>
                {counter.parameters?.map((parameter)=>
                    <div className={cls.parameter_line} key={parameter.id}>
                        <b>{`${parameter.tag}:    `}</b>
                        <p className={cls.rowElement}>{parameter.value}</p>
                        <p className={cls.rowElement}>{parameter.dimension}</p>
                    </div>
                )
                }   
            </div>
            }
        </div>
    );
});
