import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceList.module.scss";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { categoriesAllRequest } from "entities/Category";
import { objectsAllRequest } from "entities/Objects";
interface DeviceListProps {
    className?: string;
    parentID?: number;
    onSubCatMove?: () => void;
    onClick?: () => void;
}

export function DeviceList(props: PropsWithChildren<DeviceListProps>) {
    // const {className,onClick,onSubCatMove} = props;
    // const dispatch = useAppDispatch();

    // useEffect(()=>{
    //     dispatch(categoriesAllRequest());
    //     dispatch(objectsAllRequest());
    // },[dispatch]);
    return <div className={classNames(cls.DeviceList, {}, [])}></div>;
}
