import classNames from "shared/lib/classNames/classNames";
import cls from "./AppButon.module.scss";
import type { PropsWithChildren } from "react";

interface AppButonProps {
 className?: string;
}

export function AppButon(props: PropsWithChildren<AppButonProps>) {
    const { className } = props;

    return (
        <div className={classNames(cls.AppButon,{},[className])}>
        </div>  
    );
}