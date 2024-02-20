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
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";

interface ElectroCounterDetailViewProps {
 className?: string;
 counter:ElectroCounter
 height?:string;
}

export const ElectroCounterDetailView = memo((props: PropsWithChildren<ElectroCounterDetailViewProps>) => {
    const { className,counter,height } = props;
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
        <HFlexBox height={"15%"} alignItems="center" align="space-around" className={classNames(cls.counter_line,mods,[className])}>
            <b style={{"width":"13%"}} className={cls.rowElement}>{`${counter.device_type_verbose_name}`}</b>
            <p style={{"width":"6%"}} className={cls.rowElement}>{`ID:${counter.inner_id}`}</p>
            <p style={{"width":"13%"}} className={cls.rowElement}>{`№${counter.device_num ?? " Н/О"}`}</p>
            <input style={{"width":"13%"}} className={classNames(cls.rowElement,mods,[cls.inp,])} value={devName} onChange={(e)=>editHandler(e.target.value,counter.id)}/>
            {counter.parameters?.map((parameter)=>
                <HFlexBox alignItems="center" align="space-between" width="15.7%" key={parameter.id}>
                    <b style={{"width":"15%"}} className={cls.rowElement}>{`${parameter.tag}:`}</b>
                    <p style={{"width":"70%"}} className={cls.rowElement}>{parameter.value ? `${parameter.value}   ${parameter.dimension}`:"не считано"}</p>
                </HFlexBox>
            )
            }   
        </HFlexBox>
    );
});
