import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceList.module.scss";
import { PropsWithChildren } from "react";
interface DeviceListProps {
    className?: string;
    parentID?: number;
    onSubCatMove?: () => void;
    onClick?: () => void;
}

export function DeviceList(props: PropsWithChildren<DeviceListProps>) {
    return <div className={classNames(cls.DeviceList, {}, [])}></div>;
}
