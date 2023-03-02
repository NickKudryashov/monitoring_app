import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceList.module.scss";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { categoriesAllRequest } from "entities/Category";
import { objectsAllRequest } from "entities/Objects";
import { DeviceListItem } from "./DeviceListItem";
import { heatNodeAllRequest } from "entities/HeatNodes";
import { getDevices } from "entities/Heatcounters";
interface DeviceListProps {
 className?: string;
 parentID?:number;
 onClick?:()=>void;
}

export function DeviceList(props: PropsWithChildren<DeviceListProps>) {
    const {className,onClick} = props;
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(categoriesAllRequest());
        dispatch(objectsAllRequest());
        dispatch(heatNodeAllRequest());
        dispatch(getDevices());
    },[dispatch]);
    return (
        <div className={classNames(cls.DeviceList,{},[className])}>
            {/* {categories.map((category)=>category.parentID===0 && <DeviceListItem key = {category.id} parentID={category.parentID} />)} */}
            <DeviceListItem onClick={onClick} parentID={0}/>
        </div>
    );
}