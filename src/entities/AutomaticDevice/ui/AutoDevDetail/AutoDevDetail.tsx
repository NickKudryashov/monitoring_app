import classNames from "shared/lib/classNames/classNames";
import cls from "./AutoDevDetail.module.scss";

import { PropsWithChildren, useEffect, useState } from "react";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import { Loader } from "shared/ui/Loader/Loader";

interface DetailViewProps {
 className?: string;
 id:string;
}

export const  AutoDevDetail = (props: PropsWithChildren<DetailViewProps>)=> {
    const { className,children,id } = props;
    const {isLoading,data} = getAutomaticDevice(id)
    const [expandedCats,setExpandedCats] = useState<number[]>([])

    useEffect(()=>{
        return ()=>{
            setExpandedCats([])
        }
    },[id])

    if (isLoading) {
        return (<Loader/>)
    }
    // console.log("детейл счетчик рендерится");
    return (
        <div className={classNames(cls.AutoDevDetail,{},[className])}>
            <p>{`Информация по прибору ${data.name} ${data.device_type_verbose_name}`}</p>
            {data.parameters.map((paramGroup)=>
            <div key={paramGroup.id}>
                <p>{paramGroup.name}</p>
                {paramGroup.parameters.map((param)=>
                <div key={param.id}>
                    <p>{param.verbose}</p>
                    <p>{param.value}</p>
                    <p>{param.dimension}</p>
                </div>
                )}
            </div>
            )}
        </div>
    );
}