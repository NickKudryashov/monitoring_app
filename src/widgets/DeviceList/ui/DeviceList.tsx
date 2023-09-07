import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceList.module.scss";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { categoriesAllRequest } from "entities/Category";
import { objectsAllRequest } from "entities/Objects";
import { DeviceListItem } from "./DeviceListItem";
import { getDevices } from "entities/Heatcounters";
import { fetchElectroDevices } from "entities/ElectroDevice";
import { fetchPumpDevice } from "entities/PumpDevice";
interface DeviceListProps {
 className?: string;
 parentID?:number;
 onSubCatMove?:()=>void
 onClick?:()=>void;
}

export function DeviceList(props: PropsWithChildren<DeviceListProps>) {
    const {className,onClick,onSubCatMove} = props;
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(categoriesAllRequest());
        dispatch(objectsAllRequest());
        dispatch(getDevices());
        console.log("запрос при монтировании девайс листа");
        dispatch(fetchElectroDevices());
        dispatch(fetchPumpDevice());
    },[dispatch]);
    return (
        <div className={classNames(cls.DeviceList,{},[className])}>
            {/* {categories.map((category)=>category.parentID===0 && <DeviceListItem key = {category.id} parentID={category.parentID} />)} */}
            <DeviceListItem onSubCatMove={onSubCatMove} onClick={onClick} parentID={0}/>
        </div>
    );
}